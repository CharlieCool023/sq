import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, ArrowRight, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/database';

interface CareerOpening {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  salary_range: string | null;
}

const departments = ['All', 'Strategy', 'Technology', 'Finance', 'Design', 'Training'];
const types = ['All', 'Full-time', 'Contract', 'Internship'];

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [jobs, setJobs] = useState<CareerOpening[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<CareerOpening[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.description && job.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDept = selectedDept === 'All' || job.department === selectedDept;
      const matchesType = selectedType === 'All' || job.type === selectedType;
      
      return matchesSearch && matchesDept && matchesType;
    });

    setFilteredJobs(filtered);
  }, [searchQuery, selectedDept, selectedType, jobs]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('career_openings')
        .select('id, title, department, type, location, description, requirements, salary_range')
        .eq('status', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
      setFilteredJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
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
                <span>CAREERS</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Join Our{' '}
                <span className="bg-gradient-to-r from-[#7B1F7B] to-[#F47B20] bg-clip-text text-transparent">
                  Team
                </span>
              </h1>
              
              <p className="text-xl text-white/70 leading-relaxed">
                Be part of a dynamic team that's transforming businesses across Nigeria 
                and West Africa. We're always looking for talented individuals who share 
                our passion for excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="pb-20">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7B1F7B] to-[#9B3F9B] flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Meaningful Work</h3>
                <p className="text-white/60 text-sm">Make a real impact on businesses across Africa</p>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F47B20] to-[#FF9A4D] flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Growth Opportunities</h3>
                <p className="text-white/60 text-sm">Continuous learning and career development</p>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#10B981] flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Great Culture</h3>
                <p className="text-white/60 text-sm">Collaborative environment with talented peers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="section-padding">
          <div className="container-custom">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="text"
                  placeholder="Search positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#7B1F7B]"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept} className="bg-[#2D2D3A]">{dept}</option>
                  ))}
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#7B1F7B]"
                >
                  {types.map(type => (
                    <option key={type} value={type} className="bg-[#2D2D3A]">{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Jobs List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="glass rounded-2xl p-6 hover:bg-white/10 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                          <span className="px-2 py-1 bg-[#7B1F7B]/20 rounded text-[#F47B20] text-xs">
                            {job.department}
                          </span>
                        </div>
                        <p className="text-white/60 mb-3">{job.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          {job.salary_range && <span>{job.salary_range}</span>}
                        </div>
                      </div>
                      <Link
                        to={`/careers/apply/${job.id}`}
                        className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-white/40 text-lg mb-4">No open positions found</div>
                <p className="text-white/60">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
