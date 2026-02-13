import { useEffect, useState } from 'react';
import { 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Users, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/database';
import { toast } from 'sonner';

interface DashboardStats {
  contact_submissions: number;
  job_applications: number;
  blog_posts: number;
  career_openings: number;
  unread_submissions: number;
}

interface RecentActivity {
  id: string;
  action: string;
  item: string;
  time: string;
  type: 'submission' | 'application' | 'blog' | 'career';
}

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState<DashboardStats>({
    contact_submissions: 0,
    job_applications: 0,
    blog_posts: 0,
    career_openings: 0,
    unread_submissions: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchDashboardData();

    // Set up real-time subscription for new submissions
    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_submissions' }, () => {
        fetchDashboardData();
        toast.info('New submission received!');
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'job_applications' }, () => {
        fetchDashboardData();
        toast.info('New job application received!');
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats using the custom function
      const { data: statsData, error: statsError } = await supabase
        .rpc('get_dashboard_stats');

      if (statsError && statsError.code !== 'PGRST301') {
        // Fallback: fetch individual counts if function doesn't exist
        const [submissions, applications, posts, careers] = await Promise.all([
          supabase.from('contact_submissions').select('id', { count: 'exact' }),
          supabase.from('job_applications').select('id', { count: 'exact' }),
          supabase.from('blog_posts').select('id', { count: 'exact' }),
          supabase.from('career_openings').select('id', { count: 'exact' }).eq('status', true),
        ]);

        setStats({
          contact_submissions: submissions.count || 0,
          job_applications: applications.count || 0,
          blog_posts: posts.count || 0,
          career_openings: careers.count || 0,
          unread_submissions: 0,
        });
      } else if (statsData) {
        setStats(statsData as DashboardStats);
      }

      // Fetch recent submissions
      const { data: submissions } = await supabase
        .from('contact_submissions')
        .select('id, name, subject, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      // Fetch recent applications
      const { data: applications } = await supabase
        .from('job_applications')
        .select('id, applicant_name, job_id, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      // Fetch recent blog posts
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('id, title, updated_at')
        .order('updated_at', { ascending: false })
        .limit(2);

      // Build recent activity list
      const activities: RecentActivity[] = [];

      submissions?.forEach((sub) => {
        activities.push({
          id: sub.id,
          action: 'New contact submission',
          item: `${sub.name} - ${sub.subject}`,
          time: getTimeAgo(new Date(sub.created_at)),
          type: 'submission',
        });
      });

      applications?.forEach((app) => {
        activities.push({
          id: app.id,
          action: 'Job application received',
          item: app.applicant_name,
          time: getTimeAgo(new Date(app.created_at)),
          type: 'application',
        });
      });

      posts?.forEach((post) => {
        activities.push({
          id: post.id,
          action: 'Blog post updated',
          item: post.title,
          time: getTimeAgo(new Date(post.updated_at)),
          type: 'blog',
        });
      });

      // Sort by time and take first 5
      activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setRecentActivity(activities.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const statCards = [
    { 
      icon: MessageSquare, 
      label: 'Contact Submissions', 
      value: stats.contact_submissions, 
      change: `${stats.unread_submissions} unread`,
      color: 'from-[#7B1F7B] to-[#9B3F9B]',
      href: '/admin/submissions'
    },
    { 
      icon: Users, 
      label: 'Job Applications', 
      value: stats.job_applications, 
      change: 'Total applications',
      color: 'from-[#F47B20] to-[#FF9A4D]',
      href: '/admin/applications'
    },
    { 
      icon: FileText, 
      label: 'Blog Posts', 
      value: stats.blog_posts, 
      change: 'Published posts',
      color: 'from-[#22C55E] to-[#10B981]',
      href: '/admin/blog'
    },
    { 
      icon: Briefcase, 
      label: 'Open Positions', 
      value: stats.career_openings, 
      change: 'Active jobs',
      color: 'from-[#0066CC] to-[#00A3E0]',
      href: '/admin/careers'
    },
  ];

  const quickActions = [
    { label: 'Create Blog Post', href: '/admin/blog/new', color: 'bg-[#7B1F7B]' },
    { label: 'Post New Job', href: '/admin/careers/new', color: 'bg-[#F47B20]' },
    { label: 'Add Banner', href: '/admin/banners/new', color: 'bg-[#22C55E]' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white/60">
            Welcome back! Here's what's happening with your website.
          </p>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            to={stat.href}
            className="glass rounded-2xl p-6 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-[#F47B20] text-sm font-medium">{stat.change}</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-white/60 text-sm">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className={`${action.color} text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <Link to="/admin/submissions" className="text-[#F47B20] text-sm hover:underline">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <div
                key={`${activity.type}-${activity.id}`}
                className="flex items-start gap-4 p-4 bg-white/5 rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-[#F47B20] mt-2" />
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-white/60 text-sm">{activity.item}</p>
                </div>
                <span className="text-white/40 text-sm">{activity.time}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-white/40">
              No recent activity
            </div>
          )}
        </div>
      </div>

      {/* Website Preview */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Website Preview</h2>
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#F47B20] text-sm hover:underline flex items-center gap-1"
          >
            View Live Site
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="aspect-video bg-gradient-to-br from-[#7B1F7B]/20 to-[#F47B20]/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="previewLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7B1F7B" />
                    <stop offset="100%" stopColor="#F47B20" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 30 Q20 20 30 20 L50 20 Q60 20 60 30 L60 40 Q60 50 50 50 L40 50 Q30 50 30 60 L30 70 Q30 80 40 80 L70 80 Q80 80 80 70 L80 60"
                  fill="none"
                  stroke="url(#previewLogo)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M50 50 L70 50 Q80 50 80 40 L80 30"
                  fill="none"
                  stroke="url(#previewLogo)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-white/60">SQ Consulting Website</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
