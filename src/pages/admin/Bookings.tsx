import { useState, useEffect } from 'react';
import { Search, Calendar, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/database';

interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Rescheduled';
  created_at: string;
}

const statusOptions = ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'];

const AdminBookings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Don't show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (booking.company && booking.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    booking.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({ status: status as BookingRequest['status'], updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status: status as BookingRequest['status'] } : booking
      ));
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status: status as BookingRequest['status'] });
      }
      toast.success('Status updated');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking request?')) return;

    try {
      const { error } = await supabase
        .from('booking_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBookings(bookings.filter(booking => booking.id !== id));
      if (selectedBooking?.id === id) {
        setSelectedBooking(null);
      }
      toast.success('Booking deleted');
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-500';
      case 'Confirmed': return 'bg-green-500/20 text-green-500';
      case 'Completed': return 'bg-blue-500/20 text-blue-500';
      case 'Cancelled': return 'bg-red-500/20 text-red-500';
      case 'Rescheduled': return 'bg-purple-500/20 text-purple-500';
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
        <h1 className="text-2xl md:text-3xl font-bold text-white">Booking Requests</h1>
        <p className="text-white/60">Manage consultation booking requests</p>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bookings List */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-white/60 font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium">Service</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium">Status</th>
                  <th className="text-right px-4 py-3 text-white/60 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-white/40">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking)}
                      className={`border-b border-white/5 hover:bg-white/5 cursor-pointer ${
                        selectedBooking?.id === booking.id ? 'bg-[#7B1F7B]/20' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-white font-medium">{booking.name}</p>
                          <p className="text-white/60 text-sm">{booking.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white">{booking.service}</td>
                      <td className="px-4 py-3 text-white/60 text-sm">
                        {booking.preferred_date 
                          ? new Date(booking.preferred_date).toLocaleDateString()
                          : 'Not specified'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBooking(booking.id);
                          }}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-white/60 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Panel */}
        <div>
          {selectedBooking ? (
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Booking Details</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-white/40 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-sm">Name</label>
                  <p className="text-white">{selectedBooking.name}</p>
                </div>
                <div>
                  <label className="text-white/40 text-sm">Email</label>
                  <p className="text-white">{selectedBooking.email}</p>
                </div>
                <div>
                  <label className="text-white/40 text-sm">Phone</label>
                  <p className="text-white">{selectedBooking.phone}</p>
                </div>
                {selectedBooking.company && (
                  <div>
                    <label className="text-white/40 text-sm">Company</label>
                    <p className="text-white">{selectedBooking.company}</p>
                  </div>
                )}
                <div>
                  <label className="text-white/40 text-sm">Service</label>
                  <p className="text-white">{selectedBooking.service}</p>
                </div>
                <div>
                  <label className="text-white/40 text-sm">Preferred Date</label>
                  <p className="text-white">
                    {selectedBooking.preferred_date 
                      ? new Date(selectedBooking.preferred_date).toLocaleDateString()
                      : 'Not specified'}
                  </p>
                </div>
                <div>
                  <label className="text-white/40 text-sm">Preferred Time</label>
                  <p className="text-white">{selectedBooking.preferred_time || 'Not specified'}</p>
                </div>
                {selectedBooking.message && (
                  <div>
                    <label className="text-white/40 text-sm">Message</label>
                    <p className="text-white/80 whitespace-pre-wrap">{selectedBooking.message}</p>
                  </div>
                )}
                <div>
                  <label className="text-white/40 text-sm">Submitted</label>
                  <p className="text-white">
                    {new Date(selectedBooking.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <select
                    value={selectedBooking.status}
                    onChange={(e) => updateStatus(selectedBooking.id, e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteBooking(selectedBooking.id)}
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
              <Calendar className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Select a booking</h3>
              <p className="text-white/60 text-sm">Click on a booking to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
