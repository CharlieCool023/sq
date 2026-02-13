import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle, User, Mail, Phone, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/database';
import { toast } from 'sonner';

interface CareerOpening {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
}

const JobApplication = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<CareerOpening | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    message: '',
  });
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('career_openings')
        .select('id, title, department, type, location')
        .eq('id', id)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
      setJob(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoading && !job) {
    return <Navigate to="/careers" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1A2E]">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container-custom">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      setResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !resume) {
      toast.error('Please fill in all required fields and upload your resume');
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeUrl = '';

      // Upload resume to Supabase Storage if resume is selected
      if (resume) {
        const fileExt = resume.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resume);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);

        resumeUrl = publicUrl;
      }

      const { error } = await supabase
        .from('job_applications')
        .insert([{
          job_id: job!.id,
          applicant_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          resume_url: resumeUrl,
          cover_letter: formData.coverLetter,
          message: formData.message,
          status: 'Submitted',
        }]);

      if (error) throw error;

      setIsSuccess(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#1A1A2E]">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="glass rounded-3xl p-12">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
                <p className="text-white/70 mb-2">
                  Your application for <span className="text-[#F47B20]">{job?.title}</span> has been submitted successfully.
                </p>
                <p className="text-white/60 mb-8">
                  We'll review your application and get back to you within 5-7 business days.
                </p>
                <Link to="/careers" className="btn-primary inline-flex items-center gap-2">
                  View More Opportunities
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#F47B20] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </Link>

            <div className="glass rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#7B1F7B] to-[#9B3F9B] p-8">
                <span className="text-white/80 text-sm">Application for</span>
                <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">{job?.title}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-white/80 text-sm">
                  <span>{job?.department}</span>
                  <span>•</span>
                  <span>{job?.type}</span>
                  <span>•</span>
                  <span>{job?.location}</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Full Name <span className="text-[#F47B20]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email Address <span className="text-[#F47B20]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Phone Number <span className="text-[#F47B20]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                      placeholder="+234 903 755 1127"
                      required
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Resume/CV <span className="text-[#F47B20]">*</span>
                  </label>
                  <div className="relative">
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#7B1F7B] transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                      <p className="text-white/60 text-sm">
                        {resume ? resume.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-white/40 text-xs mt-1">
                        PDF, DOC, DOCX up to 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Cover Letter
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all resize-none"
                      placeholder="Tell us why you're a great fit for this role..."
                    />
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all resize-none"
                    placeholder="Any other information you'd like to share..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobApplication;
