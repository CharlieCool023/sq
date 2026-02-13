import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Users, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/database';

interface CareerOpening {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  status: boolean;
  created_at: string;
}

interface JobWithApplications extends CareerOpening {
  applications_count?: number;
}

const AdminCareers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<JobWithApplications[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      // Fetch job openings
      const { data: jobsData, error: jobsError } = await supabase
        .from('career_openings')
        .select('id, title, department, type, location, status, created_at')
        .order('created_at', { ascending: false });

      if (jobsError) {
        console.error('❌ Failed to load job openings:', {
          message: jobsError.message,
          code: jobsError.code,
          details: jobsError.details,
          hint: jobsError.hint,
        });
        throw jobsError;
      }

      console.log('✅ Successfully loaded job openings:', jobsData?.length || 0, 'records');
      setJobs(jobsData || []);
    } catch (error) {
      console.error('❌ Error fetching jobs:', error);
      // Don't show error toast - may be RLS issue or table doesn't exist
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('career_openings')
        .update({ status: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      setJobs(jobs.map(job => 
        job.id === id ? { ...job, status: !currentStatus } : job
      ));
      toast.success(`Job ${!currentStatus ? 'opened' : 'closed'} successfully`);
    } catch (error) {
      console.error('Error updating job status:', error);
      toast.error('Failed to update job status');
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;

    try {
      const { error } = await supabase
        .from('career_openings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setJobs(jobs.filter(job => job.id !== id));
      toast.success('Job posting deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job posting');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Careers</h1>
          <p className="text-white/60">Manage job openings and applications</p>
        </div>
        <Link
          to="/admin/careers/new"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </Link>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Jobs Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-white/60 font-medium">Job Title</th>
                <th className="text-left px-6 py-4 text-white/60 font-medium">Department</th>
                <th className="text-left px-6 py-4 text-white/60 font-medium">Type</th>
                <th className="text-left px-6 py-4 text-white/60 font-medium">Location</th>
                <th className="text-left px-6 py-4 text-white/60 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-white/60 font-medium">Applications</th>
                <th className="text-right px-6 py-4 text-white/60 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{job.title}</span>
                  </td>
                  <td className="px-6 py-4 text-white/70">{job.department}</td>
                  <td className="px-6 py-4 text-white/70">{job.type}</td>
                  <td className="px-6 py-4 text-white/70">{job.location}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(job.id, job.status)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        job.status
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}
                    >
                      {job.status ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {job.status ? 'Open' : 'Closed'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/applications?job=${job.id}`}
                      className="flex items-center gap-1 text-[#F47B20] hover:underline"
                    >
                      <Users className="w-4 h-4" />
                      {job.applications_count}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/careers/edit/${job.id}`}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#7B1F7B] hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40">No jobs found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCareers;
