import React from 'react';
import { Calendar, Clock, Plus, BookOpen, Save } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

interface JournalEntry {
  id: number;
  date: Date;
  title: string;
  content: string;
}

const SAMPLE_ENTRIES: JournalEntry[] = [
  {
    id: 1,
    date: new Date(2025, 2, 15),
    title: "Visit from the grandchildren",
    content: "Emma and Noah came to visit today. Emma showed me her science project about plants, and Noah played the piano for me. We had chocolate chip cookies that Sarah baked."
  },
  {
    id: 2,
    date: new Date(2025, 2, 10),
    title: "Doctor appointment",
    content: "Went to see Dr. Williams today. She said my blood pressure looks good. James drove me to the appointment and we had lunch at that diner I like afterward."
  },
  {
    id: 3,
    date: new Date(2025, 2, 5),
    title: "Memory group meeting",
    content: "Attended the memory support group at the community center. Met a nice lady named Dorothy who used to be a librarian. We talked about our favorite books."
  }
];

const Journal: React.FC = () => {
  const [entries, setEntries] = React.useState<JournalEntry[]>(SAMPLE_ENTRIES);
  const [isCreating, setIsCreating] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const [newContent, setNewContent] = React.useState("");
  const [selectedEntry, setSelectedEntry] = React.useState<JournalEntry | null>(null);

  const handleCreateEntry = () => {
    if (newTitle.trim() === "" || newContent.trim() === "") return;
    
    const newEntry: JournalEntry = {
      id: Date.now(),
      date: new Date(),
      title: newTitle,
      content: newContent
    };
    
    setEntries([newEntry, ...entries]);
    setNewTitle("");
    setNewContent("");
    setIsCreating(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-800">Your Journal</h2>
        {!isCreating && !selectedEntry && (
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            onClick={() => setIsCreating(true)}
          >
            <Plus className="h-5 w-5 mr-1" />
            <span>New Entry</span>
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 animate-fadeIn">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Create New Journal Entry</h3>
          
          <div className="mb-4">
            <label htmlFor="entry-title" className="block text-lg font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="entry-title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors"
              placeholder="What would you like to remember about today?"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="entry-content" className="block text-lg font-medium text-gray-700 mb-2">
              Your Memory
            </label>
            <textarea
              id="entry-content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={6}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors"
              placeholder="Write about what happened today..."
            ></textarea>
          </div>
          
          <div className="flex space-x-4">
            <button 
              className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              onClick={handleCreateEntry}
            >
              <Save className="h-5 w-5 mr-2" />
              Save Entry
            </button>
            <button 
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedEntry && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 animate-fadeIn">
          <button 
            className="flex items-center text-blue-600 mb-4"
            onClick={() => setSelectedEntry(null)}
          >
            <span>← Back to all entries</span>
          </button>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{selectedEntry.title}</h3>
          
          <div className="flex items-center text-gray-600 mb-6">
            <Calendar className="h-5 w-5 mr-1" />
            <span className="mr-4">{formatDate(selectedEntry.date)}</span>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-5">
            <p className="text-lg text-gray-700 whitespace-pre-line">{selectedEntry.content}</p>
          </div>
        </div>
      )}

      {!isCreating && !selectedEntry && (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div 
              key={entry.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-blue-200 transition-all cursor-pointer"
              onClick={() => setSelectedEntry(entry)}
            >
              <div className="flex items-start">
                <div className="p-3 bg-blue-50 rounded-lg mr-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{entry.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(entry.date)}</span>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{entry.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;