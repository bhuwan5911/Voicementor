'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuizEngine from './QuizEngine';
import RewardSystem from '../achievements/RewardSystem';

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [userStats, setUserStats] = useState({
    level: 3,
    totalPoints: 350,
    quizzesCompleted: 12,
    correctAnswers: 89
  });

  const quizCategories = [
    {
      id: 'programming-basics',
      title: 'Programming Basics',
      description: 'Test your understanding of fundamental programming concepts',
      icon: 'ri-code-line',
      color: 'from-blue-500 to-indigo-600',
      difficulty: 'Easy',
      questions: 5,
      points: 50,
      completed: true
    },
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'HTML, CSS, and JavaScript fundamentals',
      icon: 'ri-global-line',
      color: 'from-green-500 to-emerald-600',
      difficulty: 'Medium',
      questions: 7,
      points: 70,
      completed: true
    },
    {
      id: 'voice-interaction',
      title: 'Voice Interaction',
      description: 'Master voice commands and speech recognition',
      icon: 'ri-mic-line',
      color: 'from-purple-500 to-pink-600',
      difficulty: 'Medium',
      questions: 6,
      points: 60,
      completed: false
    },
    {
      id: 'data-structures',
      title: 'Data Structures',
      description: 'Arrays, objects, and data manipulation',
      icon: 'ri-database-line',
      color: 'from-cyan-500 to-blue-600',
      difficulty: 'Hard',
      questions: 8,
      points: 80,
      completed: false
    },
    {
      id: 'problem-solving',
      title: 'Problem Solving',
      description: 'Logic and algorithmic thinking challenges',
      icon: 'ri-puzzle-line',
      color: 'from-orange-500 to-red-600',
      difficulty: 'Hard',
      questions: 10,
      points: 100,
      completed: false
    },
    {
      id: 'career-guidance',
      title: 'Career Guidance',
      description: 'Tech career paths and industry knowledge',
      icon: 'ri-briefcase-line',
      color: 'from-indigo-500 to-purple-600',
      difficulty: 'Easy',
      questions: 5,
      points: 50,
      completed: false
    }
  ];

  const sampleQuestions = {
    'programming-basics': [
      {
        id: 1,
        type: 'voice-mcq' as const,
        question: 'What is HTML primarily used for?',
        options: ['Programming logic', 'Creating web page structure', 'Database management', 'Mobile app development'],
        correctAnswer: 'Creating web page structure',
        difficulty: 'easy' as const,
        points: 10,
        translations: {} // { es: { question: '...', options: ['...'] }, ... }
      },
      {
        id: 2,
        type: 'open-voice' as const,
        question: 'Explain what a variable is in programming and give an example.',
        correctAnswer: 'variable stores data',
        difficulty: 'medium' as const,
        points: 15,
        translations: {}
      },
      {
        id: 3,
        type: 'repeat-after-me' as const,
        question: 'Repeat this programming concept: "A function is a reusable block of code"',
        correctAnswer: 'A function is a reusable block of code',
        difficulty: 'easy' as const,
        points: 10,
        translations: {}
      },
      {
        id: 4,
        type: 'fill-blank' as const,
        question: 'Complete this sentence: "JavaScript is a _____ language used for web development"',
        correctAnswer: 'programming',
        difficulty: 'easy' as const,
        points: 10,
        translations: {}
      },
      {
        id: 5,
        type: 'voice-mcq' as const,
        question: 'Which of these is NOT a programming language?',
        options: ['Python', 'JavaScript', 'Photoshop', 'Java'],
        correctAnswer: 'Photoshop',
        difficulty: 'easy' as const,
        points: 10,
        translations: {}
      }
    ],
    'web-development': [
      {
        id: 1,
        type: 'voice-mcq' as const,
        question: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Code Style Standards'],
        correctAnswer: 'Cascading Style Sheets',
        difficulty: 'easy' as const,
        points: 10,
        translations: {}
      },
      {
        id: 2,
        type: 'open-voice' as const,
        question: 'Describe the purpose of JavaScript in web development.',
        correctAnswer: 'JavaScript adds interactivity',
        difficulty: 'medium' as const,
        points: 15,
        translations: {}
      }
    ]
  };

  const startQuiz = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    const newPoints = userStats.totalPoints + score;
    const newLevel = Math.floor(newPoints / 100) + 1;
    
    setUserStats(prev => ({
      ...prev,
      totalPoints: newPoints,
      level: newLevel,
      quizzesCompleted: prev.quizzesCompleted + 1,
      correctAnswers: prev.correctAnswers + Math.floor((score / (totalQuestions * 15)) * totalQuestions)
    }));
    
    setShowQuiz(false);
    
    // Show celebration for level up
    if (newLevel > userStats.level) {
      setTimeout(() => setShowRewards(true), 1000);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-gray-800/80 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-pacifico text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              VoiceBridge
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                Dashboard
              </Link>
              <button
                onClick={() => setShowRewards(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-trophy-line mr-2"></i>
                My Rewards
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">Sameer</div>
                  <div className="text-purple-400 text-sm">Level {userStats.level}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Test Your Knowledge
          </h1>
          <p className="text-xl text-gray-300 mb-8">Challenge yourself with interactive voice quizzes and earn amazing rewards</p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{userStats.level}</div>
              <div className="text-gray-400 text-sm">Current Level</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <div className="text-3xl font-bold text-purple-400 mb-2">{userStats.totalPoints}</div>
              <div className="text-gray-400 text-sm">Total Points</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 shadow-lg shadow-green-500/10">
              <div className="text-3xl font-bold text-green-400 mb-2">{userStats.quizzesCompleted}</div>
              <div className="text-gray-400 text-sm">Quizzes Done</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 shadow-lg shadow-yellow-500/10">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{Math.round((userStats.correctAnswers / (userStats.quizzesCompleted * 5)) * 100) || 0}%</div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Quiz Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizCategories.map((category) => (
            <div
              key={category.id}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <i className={`${category.icon} text-2xl text-white`}></i>
                </div>
                {category.completed && (
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm font-medium">
                    <i className="ri-check-line mr-1"></i>
                    Completed
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{category.title}</h3>
              <p className="text-gray-300 mb-6">{category.description}</p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getDifficultyColor(category.difficulty)}`}>
                    {category.difficulty}
                  </span>
                  <span className="text-gray-400 text-sm">{category.questions} questions</span>
                </div>
                <span className="text-purple-400 font-bold">{category.points} pts</span>
              </div>
              
              <button
                onClick={() => startQuiz(category.id)}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer ${
                  category.completed
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 hover:from-gray-500 hover:to-gray-600'
                    : `bg-gradient-to-r ${category.color} text-white hover:shadow-xl`
                }`}
                style={{
                  boxShadow: !category.completed ? `0 10px 30px ${category.color.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : category.color.includes('green') ? 'rgba(16, 185, 129, 0.3)' : category.color.includes('purple') ? 'rgba(147, 51, 234, 0.3)' : category.color.includes('cyan') ? 'rgba(6, 182, 212, 0.3)' : category.color.includes('orange') ? 'rgba(249, 115, 22, 0.3)' : 'rgba(147, 51, 234, 0.3)'}` : undefined
                }}
              >
                <i className={`${category.completed ? 'ri-refresh-line' : 'ri-play-line'} mr-2`}></i>
                {category.completed ? 'Retake Quiz' : 'Start Quiz'}
              </button>
            </div>
          ))}
        </div>

        {/* Quick Challenge Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl p-8 border border-purple-500/20 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Daily Challenge</h2>
            <p className="text-gray-300 mb-6">Complete today's special quiz for bonus rewards!</p>
            
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-6 mb-6 border border-yellow-500/30">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <i className="ri-fire-line text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400">Voice Master Challenge</h3>
                  <p className="text-yellow-300/80">Perfect your pronunciation skills</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-sm">
                <span className="text-yellow-400">⚡ 2x Points</span>
                <span className="text-yellow-400">🏆 Special Badge</span>
                <span className="text-yellow-400">⏰ 24h Only</span>
              </div>
            </div>
            
            <button
              onClick={() => startQuiz('voice-interaction')}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/25 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-zap-line mr-2"></i>
              Accept Challenge
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Engine Modal */}
      {showQuiz && selectedCategory && (
        <QuizEngine
          questions={sampleQuestions[selectedCategory as keyof typeof sampleQuestions] || sampleQuestions['programming-basics']}
          onQuizComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* Rewards System Modal */}
      <RewardSystem
        isOpen={showRewards}
        onClose={() => setShowRewards(false)}
        userLevel={userStats.level}
        totalPoints={userStats.totalPoints}
      />
    </div>
  );
}