import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Facebook, Twitter, Linkedin, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBannerContext } from '@/contexts/BannerContext';
import { supabase } from '@/lib/database';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  cover_image: string | null;
  read_time: number;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openBooking } = useBannerContext();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      setPost(data);

      // Fetch related posts
      if (data) {
        const { data: related } = await supabase
          .from('blog_posts')
          .select('id, slug, title, read_time')
          .eq('category', data.category)
          .eq('published', true)
          .neq('id', data.id)
          .limit(2);
        
        setRelatedPosts(related || []);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setPost(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1A2E]">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container-custom">
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className={`pt-32 pb-20 relative overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] opacity-20`} />
          
          <div className="container-custom relative z-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#F47B20] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            {/* Category */}
            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[#F47B20] text-sm font-medium mb-4">
              {post.category}
            </span>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl">
              {post.title}
            </h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-white/60">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.read_time} min read
              </span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="glass rounded-2xl p-8 md:p-12">
                  <div 
                    className="prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </article>

                {/* Share */}
                <div className="mt-8 flex items-center gap-4">
                  <span className="text-white/60">Share this article:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#1877F2] hover:text-white transition-colors">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#1DA1F2] hover:text-white transition-colors">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#0A66C2] hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Author */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">About the Author</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center text-white text-xl font-bold`}>
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-white font-medium">{post.author}</div>
                      <div className="text-white/60 text-sm">{post.category} Expert</div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">Expert at SQ Consulting</p>
                </div>

                {/* CTA */}
                <div className="glass rounded-2xl p-6 bg-gradient-to-br from-[#7B1F7B] to-[#5A165A]">
                  <h3 className="text-lg font-semibold text-white mb-2">Need Expert Advice?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Book a free consultation to discuss your business challenges.
                  </p>
                  <button
                    onClick={openBooking}
                    className="w-full py-3 bg-[#F47B20] text-white font-medium rounded-lg hover:bg-[#FF9A4D] transition-colors"
                  >
                    Book Consultation
                  </button>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((related) => (
                        <Link
                          key={related.id}
                          to={`/blog/${related.slug}`}
                          className="block group"
                        >
                          <h4 className="text-white group-hover:text-[#F47B20] transition-colors text-sm font-medium mb-1">
                            {related.title}
                          </h4>
                          <span className="text-white/40 text-xs">{related.readTime} min read</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
