import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/database';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  cover_image: string | null;
  read_time: number;
  created_at: string;
}

const categoryColors: Record<string, string> = {
  'Finance': 'from-[#22C55E] to-[#10B981]',
  'Data': 'from-[#7B1F7B] to-[#9B3F9B]',
  'Operations': 'from-[#0066CC] to-[#00A3E0]',
  'Technology': 'from-[#F47B20] to-[#FF9A4D]',
  'Strategy': 'from-[#8B5CF6] to-[#A78BFA]',
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'Finance', 'Data', 'Strategy', 'Operations', 'Technology'];

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, category, author, cover_image, read_time, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
      setFilteredPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B1F7B]/20 via-transparent to-[#F47B20]/10" />
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-6">
                <span className="w-8 h-[2px] bg-[#F47B20]" />
                <span>BLOG & INSIGHTS</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Latest{' '}
                <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>
              
              <p className="text-xl text-white/70 leading-relaxed">
                Stay updated with industry trends, expert perspectives, and practical 
                advice for growing your business.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="pb-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-[#F47B20] text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section-padding">
          <div className="container-custom">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Image */}
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={post.cover_image || '/images/blog-finance.jpg'}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[#7B1F7B]/90 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-white/50 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.read_time} min read
                        </span>
                      </div>

                      {/* Title */}
                      <Link to={`/blog/${post.slug}`}>
                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#F47B20] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      {/* Excerpt */}
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Author & Link */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center text-white text-xs font-bold">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-white/70 text-sm">{post.author}</span>
                        </div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-[#F47B20] hover:underline text-sm flex items-center gap-1"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-white/40 text-lg mb-4">No articles found</div>
                <p className="text-white/60">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
