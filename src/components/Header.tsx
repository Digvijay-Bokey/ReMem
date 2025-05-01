import React from 'react';
import { Calendar, Clock, Menu } from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateUtils';

const Header: React.FC = () => {
  const [dateTime, setDateTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <header className="bg-blue-50 p-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-800">Memory Companion</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center text-blue-700">
            <Calendar className="mr-2 h-5 w-5" />
            <span className="text-lg">{formatDate(dateTime)}</span>
          </div>
          
          <div className="flex items-center text-blue-700">
            <Clock className="mr-2 h-5 w-5" />
            <span className="text-lg">{formatTime(dateTime)}</span>
          </div>
          
          <button 
            className="p-2 rounded-full hover:bg-blue-100 transition-colors" 
            aria-label="Menu"
          >
            <Menu className="h-6 w-6 text-blue-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;