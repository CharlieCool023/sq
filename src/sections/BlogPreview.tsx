import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const blogPosts = [
  {
    id: '1',
    slug: 'navigating-2025-nigerian-tax-landscape',
    title: 'Navigating the 2025 Nigerian Tax Landscape',
    excerpt: 'A comprehensive guide to understanding the latest tax regulations and how they impact your business operations in Nigeria.',
    category: 'Finance',
    author: 'Oluwaseun Adeyemi',
    date: '2025-01-15',
    readTime: 5,
    color: 'from-[#22C55E] to-[#10B981]',
  },
  {
    id: '2',
    slug: 'data-is-new-oil-lagos-retailers',
    title: 'Why Data is the New Oil for Lagos Retailers',
    excerpt: 'Discover how leveraging customer data can transform your retail business and drive significant revenue growth.',
    category: 'Data',
    author: 'Chioma Nwosu',
    date: '2025-01-10',
    readTime: 4,
    color: 'from-[#7B1F7B] to-[#9B3F9B]',
  },
  {
    id: '3',
    slug: 'resilient-supply-chains-west-africa',
    title: 'Building Resilient Supply Chains in West Africa',
    excerpt: 'Key strategies for developing robust supply chain networks that can withstand disruptions and market volatility.',
    category: 'Operations',
    author: 'Ibrahim Mohammed',
    date: '2025-01-05',
    readTime: 6,
    color: 'from-[#0066CC] to-[#00A3E0]',
  },
];

const BlogPreview = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7B1F7B]/5 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="inline-flex items-center gap-2 text-[#F47B20] font-medium mb-4">
              <span className="w-8 h-[2px] bg-[#F47B20]" />
              <span>INSIGHTS</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Latest from Our{' '}
              <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                Blog
              </span>
            </h2>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#F47B20] font-medium hover:gap-3 transition-all"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Placeholder */}
              <Link to={`/blog/${post.slug}`} className="block">
                <div className={`aspect-video bg-gradient-to-br ${post.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-6xl font-bold">{post.category[0]}</span>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                      {post.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-white/50 text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min read
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

                {/* Author */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center text-white text-xs font-bold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-white/70 text-sm">{post.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
