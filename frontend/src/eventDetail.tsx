import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowLeft, Share2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';

interface EventDetail {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  image: string;
  category: string;
  totalParticipants: number;
  currentParticipants: number;
  organizer: string;
  price: string;
}

const EventDetailPage: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  
  // Sample event data
  const event: EventDetail = {
    id: 1,
    title: "Summer Music Festival",
    description: "Join us for an unforgettable evening of live music under the stars! This year's Summer Music Festival features an incredible lineup of international and local artists across multiple genres. From indie rock to electronic dance music, there's something for everyone. Enjoy food trucks, art installations, and a vibrant atmosphere that celebrates creativity and community. Bring your friends and family for a night filled with amazing performances, dancing, and memories that will last a lifetime. VIP packages include exclusive access to the backstage lounge and meet-and-greet opportunities with headlining artists.",
    location: "Central Park, New York, NY",
    date: "July 15, 2025",
    time: "6:00 PM - 11:00 PM",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80",
    category: "Music",
    totalParticipants: 5000,
    currentParticipants: 3847,
    organizer: "LiveNation Events",
    price: "$45 - $120"
  };

  const participationPercentage = (event.currentParticipants / event.totalParticipants) * 100;
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <div className="container mx-auto px-4 py-6">
          <button onClick={()=>navigate("/")} className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors duration-300 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Back to Events</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Hero Image Section */}
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-8">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold text-purple-900">
                {event.category}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex gap-3">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
                >
                  <Heart className={`w-6 h-6 transition-all duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 group">
                  <Share2 className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-10 left-6 right-6">
                <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  {event.title}
                </h1>
                <p className="text-xl text-purple-200">Organized by {event.organizer}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                  <h2 className="text-3xl font-bold text-white mb-4">About This Event</h2>
                  <p className="text-purple-100 text-lg leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Event Details Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-500/30 p-3 rounded-xl">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-purple-300 text-sm mb-1">Date</p>
                        <p className="text-white font-semibold text-lg">{event.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="bg-pink-500/30 p-3 rounded-xl">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-purple-300 text-sm mb-1">Time</p>
                        <p className="text-white font-semibold text-lg">{event.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl md:col-span-2">
                    <div className="flex items-start gap-4">
                      <div className="bg-indigo-500/30 p-3 rounded-xl">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-purple-300 text-sm mb-1">Location</p>
                        <p className="text-white font-semibold text-lg">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Participation Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl sticky top-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-linear-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-purple-300 text-sm">Participants</p>
                      <p className="text-white font-bold text-2xl">
                        {event.currentParticipants.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                      <span>Capacity</span>
                      <span>{event.totalParticipants.toLocaleString()} spots</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-linear-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${participationPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-purple-200 text-sm mt-2 text-center">
                      {(100 - participationPercentage).toFixed(1)}% spots remaining
                    </p>
                  </div>

                  <div className="border-t border-white/20 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-purple-300">Price</span>
                      <span className="text-white font-bold text-xl">{event.price}</span>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-105">
                    Register Now
                  </button>

                  <p className="text-center text-purple-300 text-sm mt-4">
                    Secure your spot today!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;