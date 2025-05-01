import React, { useState, useRef } from 'react';
import { Mic, Volume2, StopCircle } from 'lucide-react';

const AskClaude: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
        askClaude(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speakAnswer = (text: string) => {
    if ('speechSynthesis' in window) {
      stopSpeaking();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.name.includes('Female'));
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      speechSynthesisRef.current = utterance;
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const askClaude = async (text: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          input: text,
          context: "Based on my profile: I am Margaret Johnson, 78 years old, living in Springfield, Ohio. I was a schoolteacher for 35 years. My son James and daughter Sarah visit me regularly. James has two children, Emma and Noah. Please answer this question in a warm, caring way:"
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setAnswer(data.response);
      speakAnswer(data.response);
    } catch (error) {
      console.error('Error asking Claude:', error);
      setAnswer('I apologize, but I had trouble understanding. Could you please try asking again?');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-xl font-semibold text-blue-800 mb-4">Ask Me Anything</h3>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={startListening}
          disabled={isListening}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            isListening 
              ? 'bg-red-100 text-red-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Mic className="h-5 w-5 mr-2" />
          {isListening ? 'Listening...' : 'Ask Question'}
        </button>

        {answer && (
          <button
            onClick={() => isSpeaking ? stopSpeaking() : speakAnswer(answer)}
            className="flex items-center px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 font-medium rounded-lg transition-colors"
          >
            {isSpeaking ? (
              <>
                <StopCircle className="h-5 w-5 mr-2" />
                Stop Speaking
              </>
            ) : (
              <>
                <Volume2 className="h-5 w-5 mr-2" />
                Read Answer
              </>
            )}
          </button>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && askClaude(question)}
          placeholder="Type your question here..."
          className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : answer && (
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-lg text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskClaude;