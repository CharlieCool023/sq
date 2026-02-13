import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Facebook, Twitter, Linkedin, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBannerContext } from '@/contexts/BannerContext';

const blogPosts = [
  {
    id: '1',
    slug: 'navigating-2025-nigerian-tax-landscape',
    title: 'Navigating the 2025 Nigerian Tax Landscape',
    excerpt: 'A comprehensive guide to understanding the latest tax regulations and how they impact your business operations in Nigeria.',
    content: `
      <p>The Nigerian tax landscape is constantly evolving, and 2025 brings several important changes that business owners need to understand. In this comprehensive guide, we'll explore the key tax regulations affecting businesses in Nigeria and provide practical advice for compliance and optimization.</p>

      <h2>Understanding the New Tax Regulations</h2>
      <p>The Federal Inland Revenue Service (FIRS) has introduced several changes to the tax code that affect businesses of all sizes. These changes include:</p>
      <ul>
        <li>Revised corporate income tax rates</li>
        <li>New VAT compliance requirements</li>
        <li>Updated withholding tax provisions</li>
        <li>Enhanced transfer pricing regulations</li>
      </ul>

      <h2>Corporate Income Tax Updates</h2>
      <p>The corporate income tax rate structure has been revised to encourage small business growth while ensuring larger corporations contribute fairly. Companies with annual turnover below ₦25 million are now exempt from corporate income tax, while those between ₦25 million and ₦100 million pay a reduced rate of 20%.</p>

      <h2>VAT Compliance Requirements</h2>
      <p>Value Added Tax compliance has been strengthened with new reporting requirements. Businesses must now:</p>
      <ul>
        <li>File monthly VAT returns by the 21st of each month</li>
        <li>Maintain detailed records of all VATable transactions</li>
        <li>Issue tax invoices with specific mandatory information</li>
        <li>Reconcile input and output VAT monthly</li>
      </ul>

      <h2>Tax Planning Strategies</h2>
      <p>Effective tax planning can help your business minimize its tax burden while remaining fully compliant. Consider these strategies:</p>
      <ul>
        <li>Maximize available tax incentives and exemptions</li>
        <li>Optimize your business structure for tax efficiency</li>
        <li>Maintain accurate and timely records</li>
        <li>Engage professional tax advisors for complex matters</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Staying compliant with Nigeria's tax regulations is essential for business success. By understanding the latest changes and implementing effective tax planning strategies, you can ensure your business remains compliant while optimizing your tax position.</p>
    `,
    category: 'Finance',
    author: 'Oluwaseun Adeyemi',
    authorBio: 'Managing Partner at SQ Consulting with over 15 years of experience in financial strategy and tax planning.',
    date: '2025-01-15',
    readTime: 5,
    color: 'from-[#22C55E] to-[#10B981]',
  },
  {
    id: '2',
    slug: 'data-is-new-oil-lagos-retailers',
    title: 'Why Data is the New Oil for Lagos Retailers',
    excerpt: 'Discover how leveraging customer data can transform your retail business and drive significant revenue growth.',
    content: `
      <p>In the bustling retail landscape of Lagos, data has become the most valuable resource for businesses looking to gain a competitive edge. Just as oil powered the industrial revolution, data is fueling the retail transformation in Nigeria's commercial capital.</p>

      <h2>The Data Revolution in Retail</h2>
      <p>Retailers in Lagos are sitting on a goldmine of customer data, but many are not leveraging it effectively. From point-of-sale transactions to online browsing behavior, every interaction generates valuable insights that can drive business growth.</p>

      <h2>Key Data Points to Track</h2>
      <p>Successful retailers focus on collecting and analyzing these critical data points:</p>
      <ul>
        <li>Customer purchase history and frequency</li>
        <li>Product preferences and trends</li>
        <li>Peak shopping times and seasons</li>
        <li>Customer demographics and behavior</li>
        <li>Inventory turnover rates</li>
      </ul>

      <h2>Turning Data into Revenue</h2>
      <p>Here's how leading Lagos retailers are using data to increase sales:</p>
      <ul>
        <li><strong>Personalized Marketing:</strong> Target customers with relevant offers based on their purchase history</li>
        <li><strong>Inventory Optimization:</strong> Stock the right products at the right time</li>
        <li><strong>Dynamic Pricing:</strong> Adjust prices based on demand patterns</li>
        <li><strong>Customer Retention:</strong> Identify at-risk customers and engage them proactively</li>
      </ul>

      <h2>Getting Started with Data Analytics</h2>
      <p>You don't need a massive budget to start leveraging data. Begin with these simple steps:</p>
      <ul>
        <li>Implement a basic POS system that tracks customer purchases</li>
        <li>Use free tools like Google Analytics for online stores</li>
        <li>Create simple spreadsheets to track key metrics</li>
        <li>Consider affordable business intelligence tools as you grow</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Data is no longer just for big corporations. Lagos retailers of all sizes can leverage customer data to make better decisions, improve customer experience, and drive revenue growth. The question isn't whether you can afford to invest in data analytics—it's whether you can afford not to.</p>
    `,
    category: 'Data',
    author: 'Chioma Nwosu',
    authorBio: 'Strategy Director at SQ Consulting, specializing in data analytics and market research.',
    date: '2025-01-10',
    readTime: 4,
    color: 'from-[#7B1F7B] to-[#9B3F9B]',
  },
  {
    id: '3',
    slug: 'resilient-supply-chains-west-africa',
    title: 'Building Resilient Supply Chains in West Africa',
    excerpt: 'Key strategies for developing robust supply chain networks that can withstand disruptions and market volatility.',
    content: `
      <p>Supply chain resilience has become a critical priority for businesses operating in West Africa. The region's unique challenges—from infrastructure gaps to regulatory complexity—require innovative approaches to supply chain management.</p>

      <h2>Understanding West African Supply Chain Challenges</h2>
      <p>Businesses in West Africa face several unique supply chain challenges:</p>
      <ul>
        <li>Infrastructure limitations affecting transportation</li>
        <li>Regulatory complexity across multiple countries</li>
        <li>Currency volatility and payment challenges</li>
        <li>Security concerns in certain regions</li>
        <li>Limited local supplier options</li>
      </ul>

      <h2>Strategies for Building Resilience</h2>
      <p>Successful companies are implementing these strategies to build more resilient supply chains:</p>

      <h3>1. Diversify Your Supplier Base</h3>
      <p>Relying on a single supplier or region creates vulnerability. Develop relationships with multiple suppliers across different geographies to reduce risk.</p>

      <h3>2. Invest in Local Partnerships</h3>
      <p>Building strong relationships with local suppliers and logistics providers can help navigate regional challenges more effectively.</p>

      <h3>3. Implement Technology Solutions</h3>
      <p>Modern supply chain management tools can provide real-time visibility and help you respond quickly to disruptions.</p>

      <h3>4. Develop Contingency Plans</h3>
      <p>Prepare for potential disruptions by developing alternative routes, backup suppliers, and emergency protocols.</p>

      <h2>Technology Enablers</h2>
      <p>Several technologies are helping businesses improve supply chain resilience:</p>
      <ul>
        <li>IoT sensors for real-time tracking</li>
        <li>Blockchain for supply chain transparency</li>
        <li>AI-powered demand forecasting</li>
        <li>Cloud-based supply chain management platforms</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Building resilient supply chains in West Africa requires a combination of strategic planning, local partnerships, and technology adoption. Companies that invest in supply chain resilience today will be better positioned to thrive in an increasingly complex business environment.</p>
    `,
    category: 'Operations',
    author: 'Ibrahim Mohammed',
    authorBio: 'Technology Lead at SQ Consulting, specializing in supply chain optimization and digital transformation.',
    date: '2025-01-05',
    readTime: 6,
    color: 'from-[#0066CC] to-[#00A3E0]',
  },
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openBooking } = useBannerContext();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className={`pt-32 pb-20 relative overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-20`} />
          
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
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
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
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${post.color} flex items-center justify-center text-white text-xl font-bold`}>
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-white font-medium">{post.author}</div>
                      <div className="text-white/60 text-sm">{post.category} Expert</div>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">{post.authorBio}</p>
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
