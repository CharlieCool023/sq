import { useState, useEffect } from 'react';
import { Search, Download, Eye, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/database';

interface JobApplication {
  id: string;
  job_id: string;
  applicant_name: string;
  email: string;
  phone: string;
  resume_url: string;
  cover_letter?: string;
  message?: string;
  status: 'Submitted' | 'Under Review' | 'Interview' | 'Rejected' | 'Hired';
  created_at: string;
  career_openings?: {
    title: string;
  };
}

const statusOptions = ['Submitted', 'Under Review', 'Interview', 'Rejected', 'Hired'];

const AdminApplications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*, career_openings(title)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      // Don't show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const filteredApplications = applications.filter(app =>
    app.applicant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.career_openings?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: status as JobApplication['status'], updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: status as JobApplication['status'] } : app
      ));
      toast.success('Status updated');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setApplications(applications.filter(app => app.id !== id));
      if (selectedApplication?.id === id) {
        setSelectedApplication(null);
      }
      toast.success('Application deleted');
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-500/20 text-blue-500';
      case 'Under Review': return 'bg-yellow-500/20 text-yellow-500';
      case 'Interview': return 'bg-green-500/20 text-green-500';
      case 'Rejected': return 'bg-red-500/20 text-red-500';
      case 'Hired': return 'bg-purple-500/20 text-purple-500';
      default: return 'bg-white/10 text-white/60';
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
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Job Applications</h1>
        <p className="text-white/60">Review and manage job applications</p>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Applications List */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-white/60 font-medium">Applicant</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium">Position</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium">Status</th>
                  <th className="text-right px-4 py-3 text-white/60 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApplication(app)}
                    className={`border-b border-white/10 cursor-pointer hover:bg-white/5 ${
                      selectedApplication?.id === app.id ? 'bg-white/10' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-white text-sm">{app.applicant_name}</div>
                        <div className="text-white/50 text-xs">{app.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/70 text-sm">{app.career_openings?.title || 'Unknown Position'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (app.resume_url) {
                              window.open(app.resume_url, '_blank');
                            } else {
                              toast.info('Resume not available');
                            }
                          }}
                          className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#7B1F7B] hover:text-white transition-colors"
                        >
                          <Download className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteApplication(app.id);
                          }}
                          className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/40">No applications found</p>
            </div>
          )}
        </div>

        {/* Application Detail */}
        <div className="glass rounded-2xl p-6">
          {selectedApplication ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedApplication.applicant_name}</h3>
                  <p className="text-white/60 text-sm">{selectedApplication.email}</p>
                  <p className="text-white/50 text-sm">{selectedApplication.phone}</p>
                </div>
                <span className="text-white/40 text-sm">
                  {new Date(selectedApplication.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-white/60 text-sm mb-1">Applied for:</p>
                <p className="text-white">{selectedApplication.career_openings?.title || 'Unknown Position'}</p>
              </div>

              {selectedApplication.cover_letter && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/60 text-sm mb-1">Cover Letter:</p>
                  <p className="text-white/80 whitespace-pre-wrap">{selectedApplication.cover_letter}</p>
                </div>
              )}

              {selectedApplication.message && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/60 text-sm mb-1">Additional Message:</p>
                  <p className="text-white/80 whitespace-pre-wrap">{selectedApplication.message}</p>
                </div>
              )}

              {/* Status Update */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white/60 text-sm mb-2">Update Status:</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedApplication.id, status)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        selectedApplication.status === status
                          ? 'bg-[#F47B20] text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => {
                    if (selectedApplication.resume_url) {
                      window.open(selectedApplication.resume_url, '_blank');
                    } else {
                      toast.info('Resume not available');
                    }
                  }}
                  className="btn-primary text-sm inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
                <a
                  href={`mailto:${selectedApplication.email}`}
                  className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors text-sm"
                >
                  Contact Applicant
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Eye className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApplications;
