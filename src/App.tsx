import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Family from './components/Family';
import Reminders from './components/Reminders';
import Journal from './components/Journal';
import Exercises from './components/Exercises';
import Contacts from './components/Contacts';
import AskClaude from './components/AskClaude';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <AskClaude />
            <Home />
          </>
        );
      case 'family':
        return <Family />;
      case 'reminders':
        return <Reminders />;
      case 'journal':
        return <Journal />;
      case 'exercises':
        return <Exercises />;
      case 'contacts':
        return <Contacts />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;