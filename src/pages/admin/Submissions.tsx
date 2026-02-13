import { useState, useEffect } from 'react';
import { Search, Mail, Trash2, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/database';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string;
  status: string;
  is_read: boolean;
  created_at: string;
}

const AdminSubmissions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [submissionList, setSubmissionList] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('id, name, email, phone, company, service, message, status, is_read, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissionList(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      // Don't show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      setSubmissionList(submissionList.map(sub => 
        sub.id === id ? { ...sub, is_read: true } : sub
      ));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, is_read: true });
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setSubmissionList(submissionList.map(sub => 
        sub.id === id ? { ...sub, status } : sub
      ));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status });
      }
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSubmissionList(submissionList.filter(sub => sub.id !== id));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
      toast.success('Submission deleted successfully');
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast.error('Failed to delete submission');
    }
  };

  const filteredSubmissions = submissionList.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (sub.company && sub.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Submissions</h1>
          <p className="text-white/60">Manage inquiries from the contact form</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* List */}
            {filteredSubmissions.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No submissions yet</h3>
                <p className="text-white/60">Contact form submissions will appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedSubmission?.id === submission.id
                        ? 'bg-[#7B1F7B]/20'
                        : 'hover:bg-white/5'
                    } ${!submission.is_read ? 'border-l-2 border-[#F47B20]' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-medium truncate">{submission.name}</h4>
                          {!submission.is_read && (
                            <span className="px-2 py-0.5 bg-[#F47B20]/20 rounded text-[#F47B20] text-xs">New</span>
                          )}
                        </div>
                        <p className="text-white/60 text-sm truncate">{submission.email}</p>
                        {submission.company && (
                          <p className="text-white/40 text-sm">{submission.company}</p>
                        )}
                        <p className="text-white/40 text-sm mt-1 truncate">{submission.message}</p>
                      </div>
                      <span className="text-white/40 text-xs whitespace-nowrap">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details Panel */}
        <div>
          {selectedSubmission ? (
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Submission Details</h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-white/40 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-sm">Name</label>
                  <p className="text-white">{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="text-white/40 text-sm">Email</label>
                  <p className="text-white">{selectedSubmission.email}</p>
                </div>
                {selectedSubmission.phone && (
                  <div>
                    <label className="text-white/40 text-sm">Phone</label>
                    <p className="text-white">{selectedSubmission.phone}</p>
                  </div>
                )}
                {selectedSubmission.company && (
                  <div>
                    <label className="text-white/40 text-sm">Company</label>
                    <p className="text-white">{selectedSubmission.company}</p>
                  </div>
                )}
                {selectedSubmission.service && (
                  <div>
                    <label className="text-white/40 text-sm">Service</label>
                    <p className="text-white">{selectedSubmission.service}</p>
                  </div>
                )}
                <div>
                  <label className="text-white/40 text-sm">Message</label>
                  <p className="text-white/80 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
                <div>
                  <label className="text-white/40 text-sm">Submitted</label>
                  <p className="text-white">
                    {new Date(selectedSubmission.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  {!selectedSubmission.is_read && (
                    <button
                      onClick={() => markAsRead(selectedSubmission.id)}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Read
                    </button>
                  )}
                  <select
                    value={selectedSubmission.status}
                    onChange={(e) => updateStatus(selectedSubmission.id, e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <button
                    onClick={() => deleteSubmission(selectedSubmission.id)}
                    className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-6 text-center">
              <Mail className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Select a submission</h3>
              <p className="text-white/60 text-sm">Click on a submission to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissions;
