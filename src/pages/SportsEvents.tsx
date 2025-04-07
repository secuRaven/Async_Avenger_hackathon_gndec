import React from 'react';
import { Trophy, Calendar, Bell, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  postedOn: string;
}

interface SportEvent {
  id: number;
  title: string;
  date: string;
  venue?: string;
  teams?: string;
  time?: string;
  coach?: string;
  location?: string;
  note?: string;
  image: string;
  actionLabel: string;
  actionUrl: string;
}

const SportsEvents = () => {
  const { isDarkMode } = useTheme();

  const announcements: Announcement[] = [
    {
      id: 1,
      title: 'Annual Sports Meet 2025',
      description: 'Registrations are open for track and field events. Deadline: April 15th.',
      date: 'April 15, 2025',
      postedOn: 'April 5, 2025'
    },
    {
      id: 2,
      title: 'Basketball Trials',
      description: 'All students interested in joining the college basketball team must attend the trials on April 10th at 4:00 PM in the main court.',
      date: 'April 10, 2025',
      postedOn: 'April 3, 2025'
    }
  ];

  const upcomingEvents: SportEvent[] = [
    {
      id: 1,
      title: 'Inter-College Football Tournament',
      date: 'April 18, 2025',
      venue: 'College Main Ground',
      teams: '6 Colleges from the district',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop',
      actionLabel: 'View Details',
      actionUrl: '/sports/football-tournament'
    },
    {
      id: 2,
      title: 'Cricket Practice Session',
      date: 'April 12, 2025',
      time: '5:00 PM - 7:00 PM',
      coach: 'Mr. Ravi Sharma',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop',
      actionLabel: 'Join Now',
      actionUrl: '/sports/cricket-practice'
    },
    {
      id: 3,
      title: 'Yoga and Fitness Workshop',
      date: 'April 14, 2025',
      location: 'Gym Hall',
      note: 'Open to All students',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
      actionLabel: 'Register',
      actionUrl: '/sports/yoga-workshop'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-8 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8`}>
          <div className="flex items-center mb-6">
            <Trophy className={`h-8 w-8 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'} mr-3`} />
            <h1 className="text-2xl font-bold">Sports Events & Announcements</h1>
          </div>

          {/* Announcements */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Bell className={`h-5 w-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'} mr-2`} />
              <h2 className="text-xl font-semibold">Announcements</h2>
            </div>
            <div className="space-y-4">
              {announcements.map(announcement => (
                <div 
                  key={announcement.id} 
                  className={`border-l-4 ${isDarkMode ? 'border-purple-500 bg-gray-700' : 'border-purple-600 bg-gray-50'} px-4 py-3 rounded-r-md`}
                >
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{announcement.description}</p>
                  <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Posted on: {announcement.postedOn}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex items-center mb-4">
              <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'} mr-2`} />
              <h2 className="text-xl font-semibold">Upcoming Sports Events</h2>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div 
                  key={event.id} 
                  className={`overflow-hidden rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <div className="mt-2 space-y-1">
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-medium">Date:</span> {event.date}
                      </p>
                      {event.venue && (
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Venue:</span> {event.venue}
                        </p>
                      )}
                      {event.teams && (
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Participating Teams:</span> {event.teams}
                        </p>
                      )}
                      {event.time && (
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Time:</span> {event.time}
                        </p>
                      )}
                      {event.coach && (
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Coach:</span> {event.coach}
                        </p>
                      )}
                      {event.location && (
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Location:</span> {event.location}
                        </p>
                      )}
                      {event.note && (
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Note:</span> {event.note}
                        </p>
                      )}
                    </div>
                    <a 
                      href={event.actionUrl} 
                      className={`mt-4 inline-block px-4 py-2 rounded-md text-white ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-sm font-medium`}
                    >
                      {event.actionLabel}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsEvents; 