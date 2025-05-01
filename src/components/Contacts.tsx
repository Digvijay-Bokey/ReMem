import React from 'react';
import { Phone, ExternalLink, Heart, Star, Trash2 } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  relation: string;
  phone: string;
  photo: string;
  isFavorite: boolean;
  isEmergency: boolean;
}

const CONTACTS: Contact[] = [
  {
    id: 1,
    name: 'James Johnson',
    relation: 'Son',
    phone: '(555) 123-4567',
    photo: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFavorite: true,
    isEmergency: true
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    relation: 'Daughter',
    phone: '(555) 234-5678',
    photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFavorite: true,
    isEmergency: true
  },
  {
    id: 3,
    name: 'Dr. Williams',
    relation: 'Doctor',
    phone: '(555) 345-6789',
    photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFavorite: false,
    isEmergency: true
  },
  {
    id: 4,
    name: 'Mary Johnson',
    relation: 'Sister',
    phone: '(555) 678-9012',
    photo: 'https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFavorite: false,
    isEmergency: false
  },
  {
    id: 5,
    name: 'Robert Wilson',
    relation: 'Son-in-law',
    phone: '(555) 567-8901',
    photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFavorite: false,
    isEmergency: false
  },
  {
    id: 6,
    name: 'Community Center',
    relation: 'Support Service',
    phone: '(555) 789-0123',
    photo: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isFavorite: false,
    isEmergency: false
  }
];

const Contacts: React.FC = () => {
  const [contacts, setContacts] = React.useState<Contact[]>(CONTACTS);
  const [filter, setFilter] = React.useState('all');
  
  const filteredContacts = React.useMemo(() => {
    if (filter === 'all') return contacts;
    if (filter === 'favorites') return contacts.filter(c => c.isFavorite);
    if (filter === 'emergency') return contacts.filter(c => c.isEmergency);
    return contacts.filter(c => c.relation.toLowerCase() === filter.toLowerCase());
  }, [contacts, filter]);

  const toggleFavorite = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? {...contact, isFavorite: !contact.isFavorite} : contact
    ));
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-4 md:mb-0">Important Contacts</h2>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('emergency')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'emergency' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Emergency
          </button>
          <button 
            onClick={() => setFilter('favorites')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'favorites' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Favorites
          </button>
        </div>
      </div>

      {filter === 'emergency' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6 animate-pulse">
          <h3 className="text-xl font-semibold text-red-800 mb-2">In Case of Emergency</h3>
          <p className="text-lg text-red-700 mb-4">
            These are your emergency contacts. You can call them anytime you need immediate help.
          </p>
          <div className="flex flex-wrap gap-3">
            {contacts.filter(c => c.isEmergency).map(contact => (
              <a 
                key={contact.id}
                href={`tel:${contact.phone.replace(/\D/g, '')}`}
                className="flex items-center px-4 py-3 bg-white border border-red-300 rounded-lg hover:bg-red-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={contact.photo} 
                    alt={contact.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{contact.name}</div>
                  <div className="text-red-600">{contact.phone}</div>
                </div>
                <Phone className="h-5 w-5 text-red-600 ml-4" />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContacts.map((contact) => (
          <div 
            key={contact.id}
            className={`bg-white rounded-xl overflow-hidden shadow-sm transition-transform hover:scale-[1.01] ${
              contact.isEmergency ? 'border-2 border-red-200' : 'border border-gray-100'
            }`}
          >
            <div className="flex p-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mr-4">
                <img 
                  src={contact.photo} 
                  alt={contact.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
                    <p className="text-gray-600 mb-1">{contact.relation}</p>
                  </div>
                  
                  <button 
                    className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                    onClick={() => toggleFavorite(contact.id)}
                    aria-label={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {contact.isFavorite ? (
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <Star className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                <div className="flex items-center mt-2">
                  <span className="text-lg font-medium text-blue-600">{contact.phone}</span>
                </div>
                
                <div className="flex mt-3 space-x-2">
                  <a 
                    href={`tel:${contact.phone.replace(/\D/g, '')}`}
                    className="flex-1 py-2 bg-green-100 hover:bg-green-200 text-green-800 font-medium rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                  
                  {contact.isEmergency && (
                    <button className="py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-lg flex items-center justify-center transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;