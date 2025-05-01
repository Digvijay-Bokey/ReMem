import React from 'react';
import { Sun, MapPin, Calendar, Clock } from 'lucide-react';
import { formatDate, formatTime, getGreeting } from '../utils/dateUtils';

const Home: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="bg-blue-50 rounded-xl p-6 mb-8 shadow-sm animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-4">
          {getGreeting()}, Margaret
        </h2>
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-xl font-medium text-gray-700">{formatDate(currentDateTime)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-xl font-medium text-gray-700">{formatTime(currentDateTime)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-xl font-medium text-gray-700">Home</span>
          </div>
          <div className="flex items-center">
            <Sun className="h-6 w-6 text-yellow-500 mr-3" />
            <span className="text-xl font-medium text-gray-700">72°F Sunny</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-transform hover:scale-[1.01]">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">About You</h3>
          <p className="text-lg text-gray-700 mb-2">Your name is <strong>Margaret Johnson</strong></p>
          <p className="text-lg text-gray-700 mb-2">You are <strong>78 years old</strong></p>
          <p className="text-lg text-gray-700 mb-2">You live in <strong>Springfield, Ohio</strong></p>
          <p className="text-lg text-gray-700">You were a <strong>schoolteacher</strong> for 35 years</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-transform hover:scale-[1.01]">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Today's Reminders</h3>
          <ul className="space-y-3">
            <li className="flex items-center p-2 rounded bg-blue-50">
              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">9</span>
              <span className="text-lg text-gray-700">Take morning medication</span>
            </li>
            <li className="flex items-center p-2 rounded">
              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">11</span>
              <span className="text-lg text-gray-700">Doctor appointment</span>
            </li>
            <li className="flex items-center p-2 rounded">
              <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">4</span>
              <span className="text-lg text-gray-700">Family visit - James & kids</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-transform hover:scale-[1.01]">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Family Members</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="James Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-medium text-gray-700">James</span>
              <span className="text-sm text-gray-500">Son</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Sarah Wilson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-medium text-gray-700">Sarah</span>
              <span className="text-sm text-gray-500">Daughter</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-transform hover:scale-[1.01]">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Memory Exercise</h3>
          <p className="text-lg text-gray-700 mb-4">Complete a daily exercise to help stimulate your memory.</p>
          <button className="w-full py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded-lg transition-colors">
            Start Today's Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;