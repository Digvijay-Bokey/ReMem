import React from 'react';
import { Brain, CheckCircle, XCircle, RefreshCw, Award, Activity } from 'lucide-react';

interface Exercise {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  type: 'memory' | 'orientation' | 'recognition';
  difficulty: 1 | 2 | 3;
}

const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: "Today's Memory Challenge",
    description: "Test your recall of recent events and family information.",
    completed: false,
    type: 'memory',
    difficulty: 1
  },
  {
    id: 2,
    title: "Photo Recognition",
    description: "Practice identifying family members and important people in your life.",
    completed: false,
    type: 'recognition',
    difficulty: 1
  },
  {
    id: 3,
    title: "Time and Place Orientation",
    description: "Reinforce awareness of current time, date, and location.",
    completed: false,
    type: 'orientation',
    difficulty: 1
  }
];

interface MemoryQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

const memoryQuestions: MemoryQuestion[] = [
  {
    question: "What is your son's name?",
    options: ["James", "John", "Robert", "Michael"],
    correctAnswer: "James"
  },
  {
    question: "Where do you live?",
    options: ["Springfield, Ohio", "Columbus, Ohio", "Cincinnati, Ohio", "Cleveland, Ohio"],
    correctAnswer: "Springfield, Ohio"
  },
  {
    question: "What was your profession before retirement?",
    options: ["Nurse", "Teacher", "Accountant", "Engineer"],
    correctAnswer: "Teacher"
  },
  {
    question: "Who is coming to visit you today?",
    options: ["James and the grandchildren", "Sarah and Robert", "Your sister Mary", "Your doctor"],
    correctAnswer: "James and the grandchildren"
  },
  {
    question: "What is your granddaughter's name?",
    options: ["Emma", "Olivia", "Sophia", "Ava"],
    correctAnswer: "Emma"
  }
];

const Exercises: React.FC = () => {
  const [activeExercise, setActiveExercise] = React.useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);

  const handleExerciseSelect = (exercise: Exercise) => {
    setActiveExercise(exercise);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setCompleted(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === memoryQuestions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < memoryQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setActiveExercise(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setCompleted(false);
  };

  const renderExerciseContent = () => {
    if (!activeExercise) return null;

    if (activeExercise.type === 'memory') {
      const currentQuestion = memoryQuestions[currentQuestionIndex];
      
      if (completed) {
        const score = (correctAnswers / memoryQuestions.length) * 100;
        return (
          <div className="text-center py-6">
            <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Exercise Completed!</h3>
            <p className="text-xl text-gray-700 mb-6">
              You scored {correctAnswers} out of {memoryQuestions.length} ({Math.round(score)}%)
            </p>
            <div className="flex justify-center">
              <button 
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                onClick={handleReset}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Try Another Exercise
              </button>
            </div>
          </div>
        );
      }
      
      return (
        <div className="py-4">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {memoryQuestions.length}
            </div>
            <div className="flex items-center text-blue-600">
              <Activity className="h-5 w-5 mr-1" />
              <span>Score: {correctAnswers}</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map(option => (
              <button
                key={option}
                onClick={() => !isAnswered && handleAnswerSelect(option)}
                disabled={isAnswered}
                className={`w-full p-4 text-lg text-left rounded-lg transition-colors ${
                  selectedAnswer === option 
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-2 border-green-400'
                      : 'bg-red-100 border-2 border-red-400'
                    : isAnswered && option === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-2 border-green-400'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {isAnswered && option === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                  {isAnswered && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {isAnswered && (
            <div className="flex justify-center">
              <button 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < memoryQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-700 mb-6">This exercise is coming soon!</p>
        <button 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          onClick={handleReset}
        >
          Go Back
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-6">
        Memory Exercises
      </h2>

      {activeExercise ? (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fadeIn">
          <div className="mb-6">
            <button 
              className="text-blue-600 hover:underline"
              onClick={handleReset}
            >
              ← Back to all exercises
            </button>
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {activeExercise.title}
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            {activeExercise.description}
          </p>
          
          <div className="border-t border-gray-200 pt-6">
            {renderExerciseContent()}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXERCISES.map(exercise => (
            <div
              key={exercise.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-transform hover:scale-[1.02] cursor-pointer"
              onClick={() => handleExerciseSelect(exercise)}
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-blue-50 mr-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {exercise.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {exercise.description}
                  </p>
                  <div className="flex items-center">
                    <div className="flex mr-4">
                      {[...Array(3)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`w-3 h-3 rounded-full mr-1 ${
                            i < exercise.difficulty ? 'bg-blue-500' : 'bg-gray-200'
                          }`}
                        ></span>
                      ))}
                      <span className="text-sm text-gray-500 ml-1">
                        {exercise.difficulty === 1 ? 'Easy' : 
                          exercise.difficulty === 2 ? 'Medium' : 'Hard'}
                      </span>
                    </div>
                    <span className="text-sm px-2 py-1 bg-blue-50 text-blue-700 rounded-full capitalize">
                      {exercise.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercises;