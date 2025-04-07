import React, { useState } from 'react';
import { Code, Bot, Cpu, Zap, MonitorSmartphone, Gamepad } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TechEvent {
  id: number;
  title: string;
  description: string;
  image: string;
  actionUrl: string;
}

const TechnicalEvents = () => {
  const { isDarkMode } = useTheme();
  const [members, setMembers] = useState<Record<number, { name: string; urn: string }[]>>({});
  const [formData, setFormData] = useState<{ name: string; urn: string }>({
    name: '',
    urn: ''
  });
  const [currentEvent, setCurrentEvent] = useState<number | null>(null);

  const techEvents: TechEvent[] = [
    {
      id: 1,
      title: 'Hackathon',
      description: 'Show your coding skills in a 24-hour hackfest!',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=500&auto=format&fit=crop',
      actionUrl: '/tech/hackathon'
    },
    {
      id: 2,
      title: 'Robotics Challenge',
      description: 'Build your bot and conquer the arena!',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=500&auto=format&fit=crop',
      actionUrl: '/tech/robotics'
    },
    {
      id: 3,
      title: 'Coding Quiz',
      description: 'Compete in logic and code-based quiz rounds!',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500&auto=format&fit=crop',
      actionUrl: '/tech/coding-quiz'
    },
    {
      id: 4,
      title: 'Tech Debate',
      description: 'Battle your opinions on AI, Blockchain & more!',
      image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=500&auto=format&fit=crop',
      actionUrl: '/tech/debate'
    },
    {
      id: 5,
      title: 'UI/UX Sprint',
      description: 'Design user-friendly interfaces and prototypes!',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=500&auto=format&fit=crop',
      actionUrl: '/tech/uiux'
    },
    {
      id: 6,
      title: 'Gaming Tournament',
      description: 'Play competitive CS:GO, Valorant and more!',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500&auto=format&fit=crop',
      actionUrl: '/tech/gaming'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleJoin = (eventId: number) => {
    setCurrentEvent(eventId);
  };

  const handleAddMember = (eventId: number) => {
    if (!formData.name || !formData.urn) return;

    setMembers(prev => {
      const eventMembers = prev[eventId] || [];
      return {
        ...prev,
        [eventId]: [...eventMembers, { ...formData }]
      };
    });

    // Reset form
    setFormData({ name: '', urn: '' });
  };

  const getEventIcon = (title: string) => {
    switch (title) {
      case 'Hackathon':
        return <Code className="h-6 w-6" />;
      case 'Robotics Challenge':
        return <Bot className="h-6 w-6" />;
      case 'Coding Quiz':
        return <Cpu className="h-6 w-6" />;
      case 'Tech Debate':
        return <Zap className="h-6 w-6" />;
      case 'UI/UX Sprint':
        return <MonitorSmartphone className="h-6 w-6" />;
      case 'Gaming Tournament':
        return <Gamepad className="h-6 w-6" />;
      default:
        return <Code className="h-6 w-6" />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-8 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Technical Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techEvents.map(event => (
            <div 
              key={event.id} 
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden h-full flex flex-col`}
            >
              <div className="relative h-48 bg-blue-600 flex-shrink-0">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover opacity-75"
                  onError={(e) => {
                    // If image fails to load, replace with a fallback
                    e.currentTarget.src = `https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=500&auto=format&fit=crop`;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-white text-2xl font-bold text-center px-4 truncate max-w-full">{event.title}</h2>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start mb-4">
                  <div className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-3 flex-shrink-0 mt-1`}>
                    {getEventIcon(event.title)}
                  </div>
                  <p className="text-lg line-clamp-3 overflow-hidden">{event.description}</p>
                </div>
                
                <div className="mt-auto">
                  <button
                    onClick={() => handleJoin(event.id)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium"
                  >
                    Join
                  </button>

                  {currentEvent === event.id && (
                    <div className="mt-4 overflow-hidden">
                      <div className="space-y-2">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter Member Name"
                          className={`w-full px-3 py-2 border rounded-md text-sm ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                        <input
                          type="text"
                          name="urn"
                          value={formData.urn}
                          onChange={handleInputChange}
                          placeholder="Enter URN"
                          className={`w-full px-3 py-2 border rounded-md text-sm ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                        <button
                          onClick={() => handleAddMember(event.id)}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium"
                        >
                          Add Member
                        </button>
                      </div>

                      {members[event.id] && members[event.id].length > 0 && (
                        <div className="mt-4">
                          <h3 className="font-medium mb-2">Team Members:</h3>
                          <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} max-h-40 overflow-y-auto`}>
                            {members[event.id].map((member, index) => (
                              <li key={index} className="truncate">
                                {member.name} ({member.urn})
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalEvents; 