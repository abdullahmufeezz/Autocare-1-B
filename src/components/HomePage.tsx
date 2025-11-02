import { Car, Droplet, Wrench, Battery, Gauge, Clock, Shield, Award } from 'lucide-react';
import engineImage from './engine.jpg';

type HomePageProps = {
  onGetStarted: () => void;
};

export default function HomePage({ onGetStarted }: HomePageProps) {
  const services = [
    {
      icon: Droplet,
      title: 'Engine Oil Change',
      description: 'Keep your engine healthy with regular oil and filter changes.',
    },
    {
      icon: Wrench,
      title: 'Car Service',
      description: 'Tire rotation, alignment, and replacement for safe driving.',
    },
    {
      icon: Battery,
      title: 'Battery Check',
      description: 'Ensure your battery performance and replace if needed.',
    },
    {
      icon: Gauge,
      title: 'Engine Diagnose',
      description: 'Using professional tools to diagnose engine for better car health.',
    },
    {
      icon: Car,
      title: 'Brake Service',
      description: 'Complete brake inspection and repair for your safety.',
    },
    {
      icon: Shield,
      title: 'General Inspection',
      description: 'Comprehensive vehicle checkup to keep you safe on the road.',
    },
  ];

  const reviews = [
    {
      name: 'Hamza Abbas',
      review: 'The service was excellent! My car looks brand new after the wash. Highly recommended.',
      rating: 5,
    },
    {
      name: 'Husain Ahmed',
      review: 'Quick engine oil change and very friendly staff. Booking online was super easy.',
      rating: 4,
    },
    {
      name: 'Mujtaba Usman',
      review: 'Professional and reliable! They even reminded me about my next service date.',
      rating: 5,
    },
    {
      name: 'Rayyan Ibrahim',
      review: 'Very professional staff and clean workshop. They also offer reminders for my next maintenance, which is super helpful.',
      rating: 4,
    },
    {
      name: 'Hasan Khan',
      review: 'Got my car serviced last week. Everything was done perfectly — just wish the waiting area had more space. Otherwise, great experience!',
      rating: 3,
    },
  ];

  return (
    <div className="min-h-screen">
      <section
        className="relative h-screen flex items-center justify-center text-white overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${engineImage})` }}
      >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
          </div>  
        </div> */}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-blue-600 rounded-full shadow-2xl animate-pulse">
              <Car className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-blue-400">AutoCare</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-black-300 font-light">
            Book your vehicle maintenance online — fast, reliable, and easy to use.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50"
          >
            Get Started
          </button>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-3xl font-bold mb-1">24/7</p>
              <p className="text-sm text-gray-400">Online Booking</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-3xl font-bold mb-1">500+</p>
              <p className="text-sm text-gray-400">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-3xl font-bold mb-1">100%</p>
              <p className="text-sm text-gray-400">Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Wrench className="w-10 h-10 text-blue-600" />
              Services We Offer
            </h2>
            <p className="text-gray-600 text-lg">Professional vehicle care for every need</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-50 rounded-full">
                      <Icon className="w-10 h-10 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Customer Reviews
            </h2>
            <p className="text-gray-600 text-lg">See what our customers have to say</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{review.review}"</p>
                <p className="font-bold text-gray-800">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
