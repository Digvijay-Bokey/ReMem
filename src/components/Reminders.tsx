import React from 'react';
import { Calendar, Clock, Pill, User, Plus, Edit, Trash2 } from 'lucide-react';

interface Reminder {
  id: number;
  title: string;
  type: 'medication' | 'appointment' | 'activity';
  time: string;
  date: string;
  details: string;
  completed: boolean;
}

const REMINDERS: Reminder[] = [
  {
    id: 1,
    title: 'Morning Medication',
    type: 'medication',
    time: '9:00 AM',
    date: 'Daily',
    details: 'Take Aricept (donepezil) - 10mg - 1 pill with breakfast',
    completed: false
  },
  {
    id: 2,
    title: 'Evening Medication',
    type: 'medication',
    time: '8:00 PM',
    date: 'Daily',
    details: 'Take Namenda (memantine) - 10mg - 1 pill after dinner',
    completed: false
  },
  {
    id: 3,
    title: 'Dr. Williams Appointment',
    type: 'appointment',
    time: '11:00 AM',
    date: 'Today',
    details: 'Memory care check-up at Greenview Medical Center. James will drive you.',
    completed: false
  },
  {
    id: 4,
    title: 'Family Visit',
    type: 'activity',
    time: '4:00 PM',
    date: 'Today',
    details: 'James and the grandchildren are coming over. They\'ll stay for dinner.',
    completed: false
  },
  {
    id: 5,
    title: 'Memory Group',
    type: 'activity',
    time: '2:00 PM',
    date: 'Tomorrow',
    details: 'Memory support group at the community center. Sarah will pick you up.',
    completed: false
  }
];

const Reminders: React.FC = () => {
  const [reminders, setReminders] = React.useState<Reminder[]>(REMINDERS);
  const [filter, setFilter] = React.useState('all');

  const toggleComplete = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? {...reminder, completed: !reminder.completed} : reminder
    ));
  };

  const filteredReminders = React.useMemo(() => {
    if (filter === 'all') return reminders;
    if (filter === 'today') return reminders.filter(r => r.date === 'Today' || r.date === 'Daily');
    return reminders.filter(r => r.type === filter);
  }, [reminders, filter]);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'medication': return <Pill className="h-5 w-5 text-blue-600" />;
      case 'appointment': return <User className="h-5 w-5 text-purple-600" />;
      case 'activity': return <Calendar className="h-5 w-5 text-green-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'medication': return 'bg-blue-50 border-blue-100';
      case 'appointment': return 'bg-purple-50 border-purple-100';
      case 'activity': return 'bg-green-50 border-green-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-800">Reminders</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          <Plus className="h-5 w-5 mr-1" />
          <span>Add New</span>
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex flex-wrap gap-2">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('today')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'today' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Today
        </button>
        <button 
          onClick={() => setFilter('medication')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'medication' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Medications
        </button>
        <button 
          onClick={() => setFilter('appointment')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'appointment' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Appointments
        </button>
        <button 
          onClick={() => setFilter('activity')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'activity' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Activities
        </button>
      </div>

      <div className="space-y-4">
        {filteredReminders.map((reminder) => (
          <div 
            key={reminder.id}
            className={`border rounded-xl p-5 ${getColorForType(reminder.type)} transition-all ${reminder.completed ? 'opacity-60' : ''}`}
          >
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="mr-4">
                  <input 
                    type="checkbox" 
                    checked={reminder.completed}
                    onChange={() => toggleComplete(reminder.id)}
                    className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${reminder.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {reminder.title}
                  </h3>
                  <div className="flex items-center mt-1 mb-3 text-gray-600">
                    <div className="flex items-center mr-4">
                      {getIconForType(reminder.type)}
                      <span className="ml-1 capitalize">{reminder.type}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <Clock className="h-5 w-5 mr-1" />
                      <span>{reminder.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-1" />
                      <span>{reminder.date}</span>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">{reminder.details}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reminders;