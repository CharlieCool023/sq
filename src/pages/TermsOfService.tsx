import { Link } from 'react-router-dom';
import { ArrowLeft, FileCheck, Scale, AlertCircle, Briefcase } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService = () => {
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
                <FileCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
                <p className="text-white/60">Last updated: January 2025</p>
              </div>
            </div>
            
            <p className="text-white/70 text-lg">
              Please read these Terms of Service carefully before using our website and services. 
              By accessing or using SQ Consulting's services, you agree to be bound by these terms.
            </p>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Section 1 */}
            <section className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-[#F47B20]" />
                <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-white/70">
                <p>
                  By accessing or using the services provided by SQ Consulting ("we," "us," or "our"), 
                  you agree to be bound by these Terms of Service. If you do not agree to these terms, 
                  please do not use our services.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting to our website. Your continued use of our services following 
                  any changes constitutes acceptance of those changes.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-6 h-6 text-[#F47B20]" />
                <h2 className="text-xl font-bold text-white">2. Services Description</h2>
              </div>
              <div className="space-y-4 text-white/70">
                <p>SQ Consulting provides business consulting services including but not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Business Intelligence and Data Analytics</li>
                  <li>Digital Transformation and Software Transition</li>
                  <li>Accounting Operations and Financial Strategy</li>
                  <li>Business Strategy and Operational Excellence</li>
                  <li>Brand Design and Corporate Identity</li>
                  <li>Training and Development</li>
                </ul>
                <p className="mt-4">
                  All services are subject to separate engagement agreements that will outline specific 
                  deliverables, timelines, and fees.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">3. User Responsibilities</h2>
              <div className="space-y-4 text-white/70">
                <p>When using our website and services, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of any account credentials</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not engage in any activity that could harm our systems or other users</li>
                  <li>Not attempt to gain unauthorized access to any part of our services</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">4. Intellectual Property</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  All content on our website, including text, graphics, logos, images, and software, 
                  is the property of SQ Consulting or our licensors and is protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works from, or otherwise 
                  use any content without our prior written consent. Any deliverables created specifically 
                  for you as part of our consulting services will be governed by the terms of your 
                  engagement agreement.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-[#F47B20]" />
                <h2 className="text-xl font-bold text-white">5. Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-white/70">
                <p>
                  To the maximum extent permitted by law, SQ Consulting shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages, including loss of 
                  profits, data, or business opportunities, arising from or related to your use of our 
                  services.
                </p>
                <p>
                  Our total liability for any claim arising from these terms or our services shall not 
                  exceed the amount you paid us for the specific service giving rise to the claim, or 
                  NGN 100,000 if no payment was made.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">6. Confidentiality</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  We understand the sensitive nature of business information. Any confidential 
                  information shared with us during the course of our engagement will be handled 
                  in accordance with professional standards and any specific confidentiality 
                  agreements in place.
                </p>
                <p>
                  We implement appropriate security measures to protect your information, but we 
                  cannot guarantee absolute security of data transmitted over the Internet.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">7. Termination</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  We reserve the right to terminate or suspend your access to our services at any time, 
                  without prior notice, for any reason, including breach of these terms.
                </p>
                <p>
                  Upon termination, all provisions of these terms that by their nature should survive 
                  termination shall continue to apply, including ownership provisions, warranty disclaimers, 
                  and limitations of liability.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">8. Governing Law</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws 
                  of the Federal Republic of Nigeria. Any disputes arising from these terms shall be 
                  subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">9. Contact Information</h2>
              <div className="space-y-4 text-white/70">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
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

export default TermsOfService;
