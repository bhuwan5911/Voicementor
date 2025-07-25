'use client';

import { useState, useRef, useEffect } from 'react';

interface QuizQuestion {
  id: number;
  type: 'voice-mcq' | 'open-voice' | 'repeat-after-me' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  translations?: {
    [lang: string]: {
      question: string;
      options?: string[];
    }
  };
}

interface QuizEngineProps {
  questions: QuizQuestion[];
  onQuizComplete: (score: number, totalQuestions: number) => void;
  onClose: () => void;
}

export default function QuizEngine({ questions, onQuizComplete, onClose }: QuizEngineProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentQ = questions[currentQuestion];
  // Helper to get translated question/options
  const getTranslated = (q: QuizQuestion) => {
    if (selectedLanguage !== 'en' && q.translations && q.translations[selectedLanguage]) {
      return {
        question: q.translations[selectedLanguage].question,
        options: q.translations[selectedLanguage].options || q.options
      };
    }
    return { question: q.question, options: q.options };
  };
  const { question, options } = getTranslated(currentQ);

  useEffect(() => {
    if (quizStarted && currentQ?.audioUrl) {
      playQuestionAudio();
    }
  }, [currentQuestion, quizStarted]);

  const playQuestionAudio = () => {
    if (currentQ.audioUrl) {
      const audio = new Audio(currentQ.audioUrl);
      audio.play();
    } else {
      // Use speech synthesis for text-to-speech
      const utterance = new SpeechSynthesisUtterance(currentQ.question);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      setIsRecording(true);
      setRecordingTime(0);
      setTranscription('');
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      mediaRecorder.start();
      
      // Simulate speech recognition
      setTimeout(() => {
        stopRecording();
      }, 5000);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Simulate transcription
      setTimeout(() => {
        const sampleAnswers = {
          'voice-mcq': ['B', 'A markup language', 'Option B'],
          'open-voice': ['Variables store data values', 'HTML is a markup language', 'JavaScript is programming'],
          'repeat-after-me': ['A loop repeats code', 'Functions execute tasks', 'Arrays store multiple values'],
          'fill-blank': ['Variable', 'Function', 'Array']
        };
        
        const answers = sampleAnswers[currentQ.type] || ['Sample answer'];
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        setTranscription(randomAnswer);
      }, 1500);
    }
  };

  const handleMCQAnswer = (option: string) => {
    setTranscription(option);
    setTimeout(() => {
      submitAnswer(option);
    }, 500);
  };

  const submitAnswer = (answer: string) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    
    // Check if answer is correct
    let isCorrect = false;
    if (currentQ.type === 'voice-mcq' || currentQ.type === 'fill-blank') {
      isCorrect = answer.toLowerCase().includes(currentQ.correctAnswer.toLowerCase());
    } else if (currentQ.type === 'repeat-after-me') {
      isCorrect = answer.toLowerCase().includes(currentQ.correctAnswer.toLowerCase());
    } else {
      // For open-voice, give points for any reasonable answer
      isCorrect = answer.length > 10;
    }
    
    if (isCorrect) {
      setScore(prev => prev + currentQ.points);
    }
    
    // Move to next question or finish quiz
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setTranscription('');
      }, 2000);
    } else {
      setTimeout(() => {
        setShowResult(true);
        onQuizComplete(score + (isCorrect ? currentQ.points : 0), questions.length);
      }, 2000);
    }
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-md w-full p-8 border border-cyan-500/20 shadow-2xl">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-400/25">
              <i className="ri-questionnaire-line text-3xl text-white"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready for Quiz?</h2>
            <p className="text-gray-300 mb-6">Test your knowledge with {questions.length} questions and earn rewards!</p>
            
            <div className="bg-gray-700/50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">{questions.length}</div>
                  <div className="text-xs text-gray-400">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{questions.reduce((sum, q) => sum + q.points, 0)}</div>
                  <div className="text-xs text-gray-400">Max Points</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => setQuizStarted(true)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-play-line mr-2"></i>
                Start Quiz
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-700 text-gray-300 py-3 px-6 rounded-xl font-medium hover:bg-gray-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.reduce((sum, q) => sum + q.points, 0)) * 100);
    
    return (
      <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-md w-full p-8 border border-green-500/20 shadow-2xl">
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${
              percentage >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-green-400/25' :
              percentage >= 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-yellow-400/25' :
              'bg-gradient-to-r from-red-400 to-pink-500 shadow-red-400/25'
            }`}>
              <i className={`text-4xl text-white ${
                percentage >= 80 ? 'ri-trophy-line' :
                percentage >= 60 ? 'ri-medal-line' :
                'ri-emotion-line'
              }`}></i>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Job!' : 'Keep Learning!'}
            </h2>
            <p className="text-gray-300 mb-6">You scored {score} out of {questions.reduce((sum, q) => sum + q.points, 0)} points</p>
            
            <div className="bg-gray-700/50 rounded-xl p-6 mb-6">
              <div className="text-4xl font-bold text-white mb-2">{percentage}%</div>
              <div className="w-full bg-gray-600 rounded-full h-3 mb-4">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    percentage >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                    percentage >= 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                    'bg-gradient-to-r from-red-400 to-pink-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              {percentage >= 80 && (
                <div className="text-green-400 font-medium">
                  <i className="ri-star-line mr-2"></i>
                  New Badge Earned!
                </div>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-arrow-right-line mr-2"></i>
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/20 shadow-2xl">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg text-sm font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-medium">
                Score: {score}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-end mb-4">
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="hi">हिन्दी</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ar">العربية</option>
              <option value="ru">Русский</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="pt">Português</option>
              <option value="it">Italiano</option>
              <option value="tr">Türkçe</option>
              <option value="bn">বাংলা</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
              <option value="jv">Basa Jawa</option>
              <option value="ms">Bahasa Melayu</option>
              <option value="vi">Tiếng Việt</option>
              <option value="ta">தமிழ்</option>
              <option value="ur">اردو</option>
              <option value="fa">فارسی</option>
              <option value="sw">Kiswahili</option>
              <option value="mr">मराठी</option>
              <option value="te">తెలుగు</option>
              <option value="th">ไทย</option>
            </select>
          </div>
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <i className="ri-questionnaire-line text-white"></i>
              </div>
              <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-lg text-sm font-medium capitalize">
                {currentQ.type.replace('-', ' ')} • {currentQ.points} pts
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">{question}</h3>
            
            <button
              onClick={playQuestionAudio}
              className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
            >
              <i className="ri-volume-up-line mr-2"></i>
              Play Audio
            </button>
          </div>

          {/* MCQ Options */}
          {currentQ.type === 'voice-mcq' && options && (
            <div className="space-y-3 mb-6">
              <p className="text-gray-300 text-sm mb-4">Choose the correct answer:</p>
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMCQAnswer(option)}
                  className="w-full bg-gray-700/50 text-white p-4 rounded-xl text-left hover:bg-gray-600/50 transition-all transform hover:scale-[1.02] border border-gray-600 hover:border-cyan-500/50 whitespace-nowrap cursor-pointer"
                >
                  <span className="font-medium text-cyan-400 mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Voice Recording Section */}
          {(currentQ.type !== 'voice-mcq' || !options) && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-300 mb-6">
                  {currentQ.type === 'open-voice' && 'Share your thoughts in your own words'}
                  {currentQ.type === 'repeat-after-me' && 'Listen and repeat exactly what you heard'}
                  {currentQ.type === 'fill-blank' && 'Say the missing word to complete the sentence'}
                </p>
                
                <div className="flex items-center justify-center space-x-4 mb-6">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-110 shadow-lg shadow-red-500/25 cursor-pointer"
                    >
                      <i className="ri-mic-line text-3xl text-white"></i>
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors animate-pulse cursor-pointer"
                    >
                      <i className="ri-stop-line text-3xl text-white"></i>
                    </button>
                  )}
                  
                  {isRecording && (
                    <div className="text-red-400 font-mono text-xl">
                      {formatTime(recordingTime)}
                    </div>
                  )}
                </div>
              </div>
              
              {transcription && (
                <div className="bg-gray-700/50 rounded-xl p-4 border border-green-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="ri-file-text-line text-green-400"></i>
                    <span className="text-green-400 font-medium">Your Answer:</span>
                  </div>
                  <p className="text-white">{transcription}</p>
                  <button
                    onClick={() => submitAnswer(transcription)}
                    className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-check-line mr-2"></i>
                    Submit Answer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}