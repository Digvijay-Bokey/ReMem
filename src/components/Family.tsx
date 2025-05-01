import React from 'react';
import { ChevronRight, Phone, Heart } from 'lucide-react';

interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  photo: string;
  phone: string;
  notes: string;
}

const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 1,
    name: 'James Johnson',
    relation: 'Son',
    photo: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    phone: '(555) 123-4567',
    notes: 'Your oldest son. He visits every Sunday with his children Emma and Noah. He works as an engineer.'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    relation: 'Daughter',
    photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    phone: '(555) 234-5678',
    notes: 'Your daughter who lives in Boston. She calls every Wednesday evening. She is a doctor and has a cat named Whiskers.'
  },
  {
    id: 3,
    name: 'Emma Johnson',
    relation: 'Granddaughter',
    photo: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    phone: '(555) 345-6789',
    notes: 'James\'s daughter. She is 16 years old and plays soccer. Her favorite color is purple and she loves to bake cookies with you.'
  },
  {
    id: 4,
    name: 'Noah Johnson',
    relation: 'Grandson',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    phone: '(555) 456-7890',
    notes: 'James\'s son. He is 12 years old and loves video games and baseball. He often shows you his drawings.'
  },
  {
    id: 5,
    name: 'Robert Wilson',
    relation: 'Son-in-law',
    photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    phone: '(555) 567-8901',
    notes: 'Sarah\'s husband. He works as a professor and makes the grilled salmon you like when you visit them.'
  },
  {
    id: 6,
    name: 'Mary Johnson',
    relation: 'Sister',
    photo: 'https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    phone: '(555) 678-9012',
    notes: 'Your younger sister. You grew up together in Cincinnati. She now lives in Florida and visits during the holidays.'
  }
];

const Family: React.FC = () => {
  const [selectedMember, setSelectedMember] = React.useState<FamilyMember | null>(null);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-6">Your Family</h2>

      {selectedMember ? (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fadeIn">
          <button 
            className="flex items-center text-blue-600 mb-4"
            onClick={() => setSelectedMember(null)}
          >
            <ChevronRight className="h-5 w-5 rotate-180 mr-1" />
            <span>Back to all family</span>
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
              <div className="rounded-xl overflow-hidden h-72 md:h-80 bg-blue-50 mb-4">
                <img 
                  src={selectedMember.photo} 
                  alt={selectedMember.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="w-full py-3 bg-green-100 hover:bg-green-200 text-green-800 font-medium rounded-lg flex items-center justify-center transition-colors mb-2">
                <Phone className="h-5 w-5 mr-2" />
                Call {selectedMember.name.split(' ')[0]}
              </button>
              <button className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-800 font-medium rounded-lg flex items-center justify-center transition-colors">
                <Heart className="h-5 w-5 mr-2" />
                Add to Favorites
              </button>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{selectedMember.name}</h3>
              <p className="text-lg text-blue-600 mb-4">{selectedMember.relation}</p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-blue-800 mb-2">About {selectedMember.name.split(' ')[0]}</h4>
                <p className="text-lg text-gray-700">{selectedMember.notes}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-1">Phone Number</h4>
                  <p className="text-xl text-blue-600">{selectedMember.phone}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-1">Add a Memory</h4>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors text-lg"
                    placeholder={`Write a memory about ${selectedMember.name.split(' ')[0]}...`}
                    rows={3}
                  ></textarea>
                  <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                    Save Memory
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {FAMILY_MEMBERS.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-transform hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="h-48 bg-blue-50">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-lg text-blue-600">{member.relation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Family;