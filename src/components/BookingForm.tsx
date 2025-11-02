import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Car, Calendar, Wrench } from 'lucide-react';

type BookingFormProps = {
  onSuccess: () => void;
};

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    license_plate: '',
  });

  const [bookingData, setBookingData] = useState({
    service_type: '',
    description: '',
    booking_date: '',
  });

  const serviceTypes = [
    'Oil Change',
    'Brake Service',
    'Tire Rotation',
    'Engine Tune-up',
    'Battery Replacement',
    'Air Conditioning Service',
    'Transmission Service',
    'General Inspection',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .maybeSingle();

      if (userError) throw userError;
      if (!user) throw new Error('Failed to create user');

      const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .insert([{ ...vehicleData, user_id: user.id }])
        .select()
        .maybeSingle();

      if (vehicleError) throw vehicleError;
      if (!vehicle) throw new Error('Failed to create vehicle');

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            ...bookingData,
            user_id: user.id,
            vehicle_id: vehicle.id,
          },
        ]);

      if (bookingError) throw bookingError;

      setUserData({ name: '', email: '', phone: '' });
      setVehicleData({ make: '', model: '', year: new Date().getFullYear(), license_plate: '' });
      setBookingData({ service_type: '', description: '', booking_date: '' });
      setStep(1);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!userData.name || !userData.email || !userData.phone)) {
      setError('Please fill in all fields');
      return;
    }
    if (step === 2 && (!vehicleData.make || !vehicleData.model || !vehicleData.license_plate)) {
      setError('Please fill in all vehicle details');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  return (
    
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > s ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-900">
          <span>Customer Info</span>
          <span>Vehicle Details</span>
          <span>Service Booking</span>
        </div>
      </div>
          
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Car className="w-6 h-6" />
              Vehicle Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Make *
              </label>
              <input
                type="text"
                value={vehicleData.make}
                onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })}
                placeholder="e.g., Toyota, Honda, Ford"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <input
                type="text"
                value={vehicleData.model}
                onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                placeholder="e.g., Camry, Civic, F-150"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="number"
                value={vehicleData.year}
                onChange={(e) => setVehicleData({ ...vehicleData, year: parseInt(e.target.value) })}
                min="1900"
                max={new Date().getFullYear() + 1}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Plate *
              </label>
              <input
                type="text"
                value={vehicleData.license_plate}
                onChange={(e) => setVehicleData({ ...vehicleData, license_plate: e.target.value.toUpperCase() })}
                placeholder="ABC-1234"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Wrench className="w-6 h-6" />
              Book Your Service
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type *
              </label>
              <select
                value={bookingData.service_type}
                onChange={(e) => setBookingData({ ...bookingData, service_type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a service</option>
                {serviceTypes.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={bookingData.description}
                onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                placeholder="Any additional details about the service needed..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Preferred Date *
              </label>
              <input
                type="date"
                value={bookingData.booking_date}
                onChange={(e) => setBookingData({ ...bookingData, booking_date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                setStep(step - 1);
                setError('');
              }}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Booking'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
