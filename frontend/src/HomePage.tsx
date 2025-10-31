import React, { useEffect, useState, } from 'react';
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { Calendar, MapPin, Clock } from 'lucide-react';
import { axiosInstance } from './axios';

interface Event {
  _id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  imageUrl: string;
  category: string;
}

const EventsPage: React.FC = () => {
  // const events: Event[] = [
  //   {
  //     id: 1,
  //     title: "Summer Music Festival",
  //     location: "Central Park, NY",
  //     date: "July 15, 2025",
  //     time: "6:00 PM",
  //     image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
  //     category: "Music"
  //   },
  //   {
  //     id: 2,
  //     title: "Tech Innovation Summit",
  //     location: "Silicon Valley Convention Center",
  //     date: "August 22, 2025",
  //     time: "9:00 AM",
  //     image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  //     category: "Technology"
  //   },
  //   {
  //     id: 3,
  //     title: "Art & Design Expo",
  //     location: "Modern Art Gallery, LA",
  //     date: "September 10, 2025",
  //     time: "11:00 AM",
  //     image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80",
  //     category: "Art"
  //   },
  //   {
  //     id: 4,
  //     title: "Food & Wine Festival",
  //     location: "Downtown Plaza, Chicago",
  //     date: "October 5, 2025",
  //     time: "5:00 PM",
  //     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  //     category: "Food"
  //   },
  //   {
  //     id: 5,
  //     title: "Marathon Championship",
  //     location: "City Stadium, Boston",
  //     date: "November 12, 2025",
  //     time: "7:00 AM",
  //     image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80",
  //     category: "Sports"
  //   },
  //   {
  //     id: 6,
  //     title: "Winter Wonderland Concert",
  //     location: "Opera House, Seattle",
  //     date: "December 20, 2025",
  //     time: "7:30 PM",
  //     image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  //     category: "Music"
  //   }
  // ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [locations, setLocations] = useState<string[]>([]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axiosInstance.get("/events"); 
        setEvents(response.data);
        const events: Event[] = response.data as Event[];
        const uniqueLocations: string[] = Array.from(
        new Set(events.map((event) => event.location))
      );

      setLocations(uniqueLocations);


      } catch (error) {
        console.error("❌ Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const filteredEvents = selectedLocation === 'all' 
    ? events 
    : events.filter(event => event.location === selectedLocation);

 const fetchEventById = async (
    id: string,
    navigate: NavigateFunction
  ): Promise<Event | null> => {
    try {
      const response = await axiosInstance.get<Event>(`/events/${id}`);
      const event = response.data;

      navigate(`/event/details/${id}`, { state: { event } });

      return event;
    } catch (error) {
      console.error("❌ Error fetching event:", error);
      return null;
    }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-semibold animate-pulse">Loading events...</h2>
      </div>
    );
  }
  
  
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Upcoming Events
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Discover amazing experiences and create unforgettable memories
          </p>
          
          {/* Create Event Button */}
          <button onClick={()=>navigate("create")} className="absolute top-0 right-10 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 flex items-center gap-2 group">
            <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
            Create Event
          </button>
        </div>

        {/* Location Filter Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
           
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedLocation('all')}
                className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedLocation === 'all'
                    ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/20 text-purple-200 hover:bg-white/30 hover:text-white'
                }`}
              >
                All Locations ({events.length})
              </button>
              
              {locations.map((location) => {
                const count = events.filter(e => e.location === location).length;
                return (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(location)}
                    className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedLocation === location
                        ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                        : 'bg-white/20 text-purple-200 hover:bg-white/30 hover:text-white'
                    }`}
                  >
                    {location} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="max-w-7xl mx-auto mb-6">
          <p className="text-purple-200 text-center">
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
            {selectedLocation !== 'all' && ` in ${selectedLocation}`}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="group relative"
              onMouseEnter={() => setHoveredId(event._id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => fetchEventById(event._id.toString(), navigate)}
            >
              <div className={`relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 border border-white/20 ${
                hoveredId === event._id ? 'transform scale-105 shadow-purple-500/50' : ''
              }`}>
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredId === event._id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold text-purple-900">
                    {event.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {event.title}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center text-purple-200 group-hover:text-white transition-colors duration-300">
                      <MapPin className="w-5 h-5 mr-3 shrink-0" />
                      <span className="text-sm">{event.location}</span>
                    </div>

                    <div className="flex items-center text-purple-200 group-hover:text-white transition-colors duration-300">
                      <Calendar className="w-5 h-5 mr-3 shrink-0" />
                      <span className="text-sm">{event.date}</span>
                    </div>

                    <div className="flex items-center text-purple-200 group-hover:text-white transition-colors duration-300">
                      <Clock className="w-5 h-5 mr-3 shrink-0" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <button className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    hoveredId === event._id
                      ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}>
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;