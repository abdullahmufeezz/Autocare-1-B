import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Booking, Vehicle, User } from '../lib/supabase';
import { RefreshCw, CheckCircle, XCircle, Clock, Car, Calendar, User as UserIcon } from 'lucide-react';

export default function AdminPanel() {
  const [bookings, setBookings] = useState<(Booking & { vehicle: Vehicle; user: User })[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          vehicle:vehicles(*),
          user:users(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  
  // Logout Button Design
  useEffect(() => {
  const handleBeforeUnload = async () => {
    await supabase.auth.signOut();
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
  //************************* */

  const updateBookingStatus = async (
    bookingId: string,
    status: 'approved' | 'rejected' | 'completed',
    notes?: string
  ) => {
    setUpdatingId(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status, admin_notes: notes || '' })
        .eq('id', bookingId);

      if (error) throw error;
      await fetchBookings();
    } catch (err: any) {
      console.error('Error updating booking:', err);
      alert('Failed to update booking status');
    } finally {
      setUpdatingId(null);
    }
  };
  
// Logout function (Newly added)
    const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      alert('You have been logged out.');
      window.location.href = '/admin-login'; // redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
//************************* */

  const handleStatusUpdate = (bookingId: string, status: 'approved' | 'rejected' | 'completed') => {
    const notes = prompt(`Add admin notes (optional):`);
    updateBookingStatus(bookingId, status, notes || undefined);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    approved: bookings.filter((b) => b.status === 'approved').length,
    rejected: bookings.filter((b) => b.status === 'rejected').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  };

  return (
    <div className="max-w-7xl w-full space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">

        {/* Sample Code */}
        <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <div className="flex gap-3">
      <button
      onClick={fetchBookings}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
      >
      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
      Refresh
      </button>

      <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
      >
      Logout
      </button>
      </div>
      </div>


        {/* Orignal code Below */}
        {/* <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
            <p className="text-sm text-yellow-700 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <p className="text-sm text-green-700 mb-1">Approved</p>
            <p className="text-2xl font-bold text-green-800">{stats.approved}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
            <p className="text-sm text-red-700 mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-800">{stats.rejected}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-blue-700 mb-1">Completed</p>
            <p className="text-2xl font-bold text-blue-800">{stats.completed}</p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'approved', 'rejected', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-600">{booking.vehicle.license_plate}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <UserIcon className="w-3 h-3" />
                          Customer
                        </p>
                        <p className="font-semibold text-gray-800">{booking.user.name}</p>
                        <p className="text-sm text-gray-600">{booking.user.email}</p>
                        <p className="text-sm text-gray-600">{booking.user.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Service Type</p>
                        <p className="font-semibold text-gray-800">{booking.service_type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Booking Date
                        </p>
                        <p className="font-semibold text-gray-800">
                          {new Date(booking.booking_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {booking.description && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Description</p>
                        <p className="text-sm text-gray-800">{booking.description}</p>
                      </div>
                    )}

                    {booking.admin_notes && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Admin Notes</p>
                        <p className="text-sm text-gray-800">{booking.admin_notes}</p>
                      </div>
                    )}

                    <p className="text-xs text-gray-500">
                      Booked: {new Date(booking.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3 ml-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>

                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'approved')}
                          disabled={updatingId === booking.id}
                          className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                          disabled={updatingId === booking.id}
                          className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:bg-gray-400"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {booking.status === 'approved' && (
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'completed')}
                        disabled={updatingId === booking.id}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
