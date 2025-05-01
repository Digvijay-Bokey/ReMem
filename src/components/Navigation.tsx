import React from 'react';
import { Home, Users, Calendar, Clock, BookOpen, Brain, Phone, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'reminders', label: 'Reminders', icon: Calendar },
    { id: 'routine', label: 'Daily Routine', icon: Clock },
    { id: 'journal', label: 'My Journal', icon: BookOpen },
    { id: 'exercises', label: 'Exercises', icon: Brain },
    { id: 'contacts', label: 'Emergency', icon: Phone },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white shadow-sm px-4 py-2 md:py-0 overflow-x-auto">
      <div className="max-w-6xl mx-auto">
        <ul className="flex md:justify-around space-x-2 md:space-x-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center p-3 rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className="h-6 w-6 mb-1" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;