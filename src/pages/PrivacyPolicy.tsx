import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#F47B20] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7B1F7B] to-[#F47B20] flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
                <p className="text-white/60">Last updated: January 2025</p>
              </div>
            </div>
            
            <p className="text-white/70 text-lg">
              At SQ Consulting, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our website and services.
            </p>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Section 1 */}
            <section className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-[#F47B20]" />
                <h2 className="text-xl font-bold text-white">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-white/70">
                <p>We may collect the following types of information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Personal Information:</strong> Name, email address, phone number, company name, and job title when you contact us or book a consultation.</li>
                  <li><strong className="text-white">Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent.</li>
                  <li><strong className="text-white">Cookies:</strong> We use cookies to enhance your browsing experience and analyze website traffic.</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-[#F47B20]" />
                <h2 className="text-xl font-bold text-white">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-white/70">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain our consulting services</li>
                  <li>Respond to your inquiries and booking requests</li>
                  <li>Send you relevant updates, newsletters, and marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraudulent or illegal activity</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-[#F47B20]" />
                <h2 className="text-xl font-bold text-white">Information Sharing</h2>
              </div>
              <div className="space-y-4 text-white/70">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Service Providers:</strong> With trusted third-party vendors who assist us in operating our website and conducting our business.</li>
                  <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or governmental regulation.</li>
                  <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Data Security</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                  over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Your Rights</h2>
              <div className="space-y-4 text-white/70">
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to or restrict certain processing activities</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:sqconsultinginc@gmail.com" className="text-[#F47B20] hover:underline">
                    sqconsultinginc@gmail.com
                  </a>
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Contact Us</h2>
              <div className="space-y-4 text-white/70">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="mt-4 space-y-2">
                  <p><strong className="text-white">SQ Consulting</strong></p>
                  <p>Email: <a href="mailto:sqconsultinginc@gmail.com" className="text-[#F47B20] hover:underline">sqconsultinginc@gmail.com</a></p>
                  <p>Phone: <a href="tel:09037551127" className="text-[#F47B20] hover:underline">09037551127</a></p>
                  <p>Address: Lagos Island, Lagos, Nigeria</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
