import React, { useState } from 'react';
import { 
  Calendar, MapPin, Users, Clock 
} from 'lucide-react';
import EventList from '../components/events/EventList';
import { mockEvents } from '../utils/mockData';
import { Event } from '../types';

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isViewingEvent, setIsViewingEvent] = useState(false);

  const handleAddEvent = () => {
    setIsAddingEvent(true);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsAddingEvent(true);
    setIsViewingEvent(false);
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsViewingEvent(true);
    setIsAddingEvent(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-gray-800 dark:text-white mb-2">
          Eventos
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Gerencie eventos, reuniões e encontros da igreja.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-primary-500 text-white">
            <div className="flex items-center mb-4">
              <Calendar size={24} className="mr-2 text-secondary-500" />
              <h3 className="text-xl font-semibold">Próximo Evento</h3>
            </div>
            
            <h4 className="text-lg font-semibold mb-2">{mockEvents[0].title}</h4>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-secondary-300" />
                <span>12/05/2024</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-secondary-300" />
                <span>09:00 - 12:00</span>
              </div>
              
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-secondary-300" />
                <span>{mockEvents[0].location}</span>
              </div>
            </div>
            
            <button className="mt-2 btn bg-white text-primary-500 hover:bg-gray-100">
              Ver Detalhes
            </button>
          </div>
          
          <div className="card md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Calendar size={20} className="mr-2 text-primary-500" />
              Eventos Recorrentes
            </h3>
            
            <div className="space-y-4">
              {[
                { 
                  title: 'Culto Dominical', 
                  time: 'Domingo, 09:00 - 12:00',
                  location: 'Templo Principal',
                  frequency: 'Semanal',
                },
                { 
                  title: 'Culto de Oração', 
                  time: 'Quarta, 19:30 - 21:00',
                  location: 'Templo Principal',
                  frequency: 'Semanal',
                },
                { 
                  title: 'Estudo Bíblico', 
                  time: 'Sexta, 19:30 - 21:00',
                  location: 'Sala de Estudos',
                  frequency: 'Semanal',
                },
              ].map((event, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700"
                >
                  <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-500 mr-3">
                    <Calendar size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-800 dark:text-white">{event.title}</span>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />{event.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" />{event.location}
                      </span>
                    </div>
                  </div>
                  <span className="ml-2 text-xs px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                    {event.frequency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <EventList
          events={mockEvents}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onViewEvent={handleViewEvent}
        />
      </div>
      
      {/* Add modal/form components for adding/editing/viewing events */}
      {/* These would be implemented in a real application */}
    </div>
  );
};

export default Events;