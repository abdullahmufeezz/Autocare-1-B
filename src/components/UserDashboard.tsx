import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Booking, Vehicle, User } from '../lib/supabase';
import { Search, Calendar, Car, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookings, setBookings] = useState<(Booking & { vehicle: Vehicle; user: User })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter an email or license plate');
      return;
    }

    setLoading(true);
    setError('');        // Clear previous errors

    try {
      const { data: bookingsData, error: bookingsError } = await supabase 
        .from('bookings')
        .select(`
          *,
          vehicle:vehicles(*),
          user:users(*)
        `)
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      const filtered = bookingsData?.filter((booking: any) => {
      const emailMatch = booking.user.email.toLowerCase() === searchQuery.toLowerCase();
      const plateMatch = booking.vehicle.license_plate.toLowerCase() === searchQuery.toLowerCase();
      return emailMatch || plateMatch;
      }) || [];

      // *** Alternative filtering logic to match email domain *** (matching email and license plate)
      // const filtered = bookingsData?.filter((booking: any) => {
      //   const emailMatch = booking.user.email.toLowerCase() === `${searchQuery.toLowerCase()}@gmail.com`;
      //  // const emailMatch = booking.user.email.toLowerCase().includes(searchQuery.toLowerCase());
      //   const plateMatch = booking.vehicle.license_plate.toLowerCase().includes(searchQuery.toLowerCase());
      //   return emailMatch || plateMatch;
      // }) || [];

      setBookings(filtered);

      if (filtered.length === 0) {
        setError('No bookings found for this email or license plate');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="max-w-5xl w-full space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Check Your Booking Status</h2>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter your email or license plate..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}
      </div>

      {bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Car className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-600">{booking.vehicle.license_plate}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="font-semibold capitalize">{booking.status}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Service Type</p>
                    <p className="font-semibold text-gray-800">{booking.service_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Booking Date
                    </p>
                    <p className="font-semibold text-gray-800">
                      {new Date(booking.booking_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {booking.description && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="text-gray-800">{booking.description}</p>
                  </div>
                )}

                {booking.admin_notes && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-1">Admin Notes</p>
                    <p className="text-gray-800">{booking.admin_notes}</p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Customer: {booking.user.name}</span>
                    <span>Booked on: {new Date(booking.created_at).toLocaleDateString()}</span>
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
