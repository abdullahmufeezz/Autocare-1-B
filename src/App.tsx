import { useState } from 'react';                            //{ use-State } React Hook for managing component state.
import HomePage from './components/HomePage';  // Home page component with introductory content.
import BookingForm from './components/BookingForm'; // Booking form component for scheduling vehicle services.
import UserDashboard from './components/UserDashboard';  // User dashboard component for tracking bookings.
import AdminPanel from './components/AdminPanel'; // Admin panel component for managing services and bookings.
import AdminLogin from './components/AdminLogin'; // Admin login component for secure access to admin functionalities.
import Footer from './components/Footer';// Footer component with additional links and information.
import { Wrench, Home, Search, Shield } from 'lucide-react';         // lucide react provides svg icons

type View = 'home' | 'booking' | 'dashboard' | 'adminLogin' | 'admin'; // Define possible views for the application.

function App() {   // Main application component managing views and state.
  const [view, setView] = useState<View>('home');   // State to track the current view of the application.
  const [showSuccess, setShowSuccess] = useState(false);  // State to control the display of the booking success message.
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);  // State to track if the admin is logged in.

  const handleBookingSuccess = () => {    // When a booking is successfully made, this function is called to show a success message and redirect to the dashboard.
    setShowSuccess(true);// Show success message
    setTimeout(() => { // After 2 seconds, hide the message and navigate to dashboard
      setShowSuccess(false); // Hide success message
      setView('dashboard'); // Navigate to dashboard
    }, 2000);// 2-second delay
  };

  const handleAdminLoginSuccess = () => {  // When admin login is successful, this function updates the state to reflect that and navigates to the admin panel.
    setIsAdminLoggedIn(true); // Set admin login state to true
    setView('admin'); // Navigate to admin panel
  };

  const handleAdminClick = () => {   // Handle click on the admin button in the navigation bar.
    if (isAdminLoggedIn) {
      setView('admin');
    } else {
      setView('adminLogin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"> {/* Main container with gradient background */}
      <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">  {/* Navigation bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">    {/* Container for navigation content */}
          <div className="flex justify-between items-center h-16">  {/* Navigation bar with logo and buttons */}

            {/* Defining the Logo button of auto care */}
            <button
              onClick={() => setView('home')}  // Navigate to home on logo click
              className="flex items-center gap-3 hover:opacity-80 transition-opacity" // Logo and title styling
            >
              <div className="p-2 bg-blue-600 rounded-lg">  
                <Wrench className="w-6 h-6 text-white" /> 
              </div>
              <h1 className="text-2xl font-bold text-gray-800">AutoCare</h1>
            </button>
            {/* ****************************************************************** */}
            <div className="flex gap-2"> {/* Navigation buttons Container*/}
              {/* Defining home Button in nav bar */}
              <button
                onClick={() => setView('home')}  
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'home'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
              <Home className="w-4 h-4" /> Home </button>
              {/* ******************************** */}

              {/* Booking Button */}
              <button
                onClick={() => setView('booking')}  // Navigate to booking view
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${ // Button styling based on current view
                  view === 'booking'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Wrench className="w-4 h-4" /> 
                Book Service
              </button>
              {/* ******************************************* */}

              {/* Dashboard Button (tracking Booking page) */}
              <button
                onClick={() => setView('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Search className="w-4 h-4" />
                Track Booking
              </button>
              {/* ******************************************* */}

              {/* Admin Button */}
              <button
                onClick={handleAdminClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'admin' || view === 'adminLogin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
              {/* ******************************************* */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Section for main page */}
      <main className="flex-grow"> 
      {/* home page view and when the person click get started it would redirect to booking page */}
        {view === 'home' && <HomePage onGetStarted={() => setView('booking')} />} 

      {/* Booking Page Designing */}
        {view === 'booking' && ( // Booking form view
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col items-center">         {/* Centered container for booking form */}
              <div className="text-center mb-8">          {/* Heading and description */}      
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Book Your Vehicle Service
                </h2>
                <p className="text-gray-600">
                  Quick and easy scheduling for all your vehicle maintenance needs
                </p>
              </div>
              <BookingForm onSuccess={handleBookingSuccess} />
            </div>
          </div>
        )}

        {view === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col items-center">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Track Your Booking
                </h2>
                <p className="text-gray-600">
                  Check the status of your service appointments
                </p>
              </div>
              <UserDashboard />
            </div>
          </div>
        )}

        {view === 'adminLogin' && (
          <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
        )}

        {view === 'admin' && isAdminLoggedIn && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AdminPanel />
          </div>
        )}
      </main>

      <Footer />

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 animate-bounce">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Successful!</h3>
              <p className="text-gray-600">
                Your service has been booked. Redirecting to dashboard...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
