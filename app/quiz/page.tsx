'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import QuizEngine from './QuizEngine';
import RewardSystem from '../achievements/RewardSystem';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  expertise: string;
  languages: string[];
}

interface QuizStats {
  level: number;
  totalPoints: number;
  quizzesCompleted: number;
  accuracy: number;
}

export default function QuizPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userStats, setUserStats] = useState<QuizStats>({
    level: 1,
    totalPoints: 0,
    quizzesCompleted: 0,
    accuracy: 0
  });
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Get user from session
      const { data: { user } } = await import('@supabase/supabase-js').then(supabase => 
        supabase.createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_KEY!
        ).auth.getUser()
      );

      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch user profile and stats with better error handling
      try {
        // First get user profile
        const profileRes = await fetch(`/api/users?email=${user.email}`);
        
        if (profileRes.ok) {
          const profiles = await profileRes.json();
          if (profiles.length > 0) {
            const profile = profiles[0];
            setUserProfile(profile);
            
            // Now get quizzes using the database user ID
            const quizzesRes = await fetch(`/api/quizzes?userId=${profile.id}`);
            
            // Calculate stats from quizzes
            if (quizzesRes.ok) {
              const quizzes = await quizzesRes.json();
              const totalCorrect = quizzes.reduce((sum: number, q: any) => sum + (q.correctAnswers || 0), 0);
              const totalAnswered = quizzes.reduce((sum: number, q: any) => sum + (q.totalAnswers || 0), 0);
              const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
              const totalPoints = quizzes.reduce((sum: number, q: any) => sum + (q.points || 0), 0);
              const level = Math.floor(totalPoints / 100) + 1;
              
              setUserStats({
                level,
                totalPoints,
                quizzesCompleted: quizzes.length,
                accuracy
              });
            }
          } else {
            // User is logged in but no profile - redirect to dashboard instead of onboarding
            router.push('/dashboard');
            return;
          }
        } else {
          // Handle API error gracefully
          console.warn('Failed to fetch user profile, using default stats');
          setDbConnected(false);
          setUserStats({
            level: 1,
            totalPoints: 0,
            quizzesCompleted: 0,
            accuracy: 0
          });
        }
      } catch (apiError) {
        // Handle network/database errors gracefully
        console.warn('Database connection issue, using default stats:', apiError);
        setDbConnected(false);
        setUserStats({
          level: 1,
          totalPoints: 0,
          quizzesCompleted: 0,
          accuracy: 0
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Set default stats on error
      setUserStats({
        level: 1,
        totalPoints: 0,
        quizzesCompleted: 0,
        accuracy: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const quizCategories = [
    {
      id: 'programming-basics',
      title: 'Programming Basics',
      description: 'Test your understanding of fundamental programming concepts',
      icon: 'ri-code-line',
      color: 'from-blue-500 to-indigo-600',
      questions: 10
    },
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'HTML, CSS, and JavaScript fundamentals',
      icon: 'ri-global-line',
      color: 'from-green-500 to-emerald-600',
      questions: 10
    },
    {
      id: 'voice-interaction',
      title: 'Voice Interaction',
      description: 'Master voice commands and speech recognition',
      icon: 'ri-mic-line',
      color: 'from-purple-500 to-pink-600',
      questions: 10
    },
    {
      id: 'data-structures',
      title: 'Data Structures',
      description: 'Arrays, objects, and data manipulation',
      icon: 'ri-database-line',
      color: 'from-cyan-500 to-blue-600',
      questions: 10
    },
    {
      id: 'problem-solving',
      title: 'Problem Solving',
      description: 'Logic and algorithmic thinking challenges',
      icon: 'ri-puzzle-line',
      color: 'from-orange-500 to-red-600',
      questions: 10
    },
    {
      id: 'career-guidance',
      title: 'Career Guidance',
      description: 'Tech career paths and industry knowledge',
      icon: 'ri-briefcase-line',
      color: 'from-indigo-500 to-purple-600',
      questions: 10
    }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', color: 'from-green-500 to-emerald-600', points: 10 },
    { id: 'medium', name: 'Medium', color: 'from-yellow-500 to-orange-600', points: 15 },
    { id: 'hard', name: 'Hard', color: 'from-red-500 to-pink-600', points: 20 }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ];

  const startQuiz = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowQuiz(true);
  };

  const handleQuizComplete = async (score: number, totalQuestions: number, correctAnswers: number) => {
    if (!userProfile) return;

    try {
      // Save quiz results to database
      const quizData = {
        userId: userProfile.id,
        question: `Quiz completed for ${selectedCategory}`,
        answer: `Score: ${score}/${totalQuestions * 20}`,
        category: selectedCategory,
        difficulty: selectedDifficulty,
        language: selectedLanguage,
        options: [],
        type: 'quiz',
        points: score,
        correctAnswers: correctAnswers,
        totalAnswers: totalQuestions
      };

      try {
        await fetch('/api/quizzes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(quizData)
        });

        // Fetch updated quiz data to check for badges
        const updatedQuizzesRes = await fetch(`/api/quizzes?userId=${userProfile.id}`);
        if (updatedQuizzesRes.ok) {
          const updatedQuizzes = await updatedQuizzesRes.json();

          // Import and use badge service
          const { calculateUserStats, checkAndAwardBadges } = await import('@/lib/badgeService');
          const userStats = calculateUserStats(updatedQuizzes, userProfile.id);
          const newBadges = await checkAndAwardBadges(userStats);

          // Update local stats
          const newPoints = userStats.totalPoints;
          const newLevel = userStats.level;
          
          setUserStats({
            level: newLevel,
            totalPoints: newPoints,
            quizzesCompleted: userStats.quizzesCompleted,
            accuracy: userStats.accuracy
          });
          
          // Show celebration for new badges or level up
          if (newBadges.length > 0 || newLevel > userStats.level) {
            setTimeout(() => setShowRewards(true), 1000);
          }
        }
      } catch (apiError) {
        console.warn('Failed to save quiz results to database:', apiError);
        // Still update local stats even if database save fails
        const newPoints = userStats.totalPoints + score;
        const newLevel = Math.floor(newPoints / 100) + 1;
        
        setUserStats(prev => ({
          level: newLevel,
          totalPoints: newPoints,
          quizzesCompleted: prev.quizzesCompleted + 1,
          accuracy: prev.accuracy // Keep existing accuracy
        }));
      }
      
      setShowQuiz(false);
    } catch (error) {
      console.error('Error in quiz completion:', error);
      // Still close quiz even if there's an error
      setShowQuiz(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="text-white mt-4">Loading quiz data...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="text-white mt-4">Setting up your profile...</p>
        </div>
      </div>
    );
  }

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
                  <span className="text-white text-sm font-bold">{userProfile.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{userProfile.name}</div>
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
          
          {/* Database Connectivity Warning */}
          {!dbConnected && (
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <i className="ri-wifi-off-line text-yellow-400 text-xl"></i>
                <div className="text-center">
                  <p className="text-yellow-300 font-semibold">Database Connection Issue</p>
                  <p className="text-yellow-200/80 text-sm">Your progress will be saved locally. Please check your internet connection.</p>
                </div>
              </div>
            </div>
          )}
          
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
              <div className="text-3xl font-bold text-yellow-400 mb-2">{userStats.accuracy}%</div>
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
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{category.title}</h3>
              <p className="text-gray-300 mb-6">{category.description}</p>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-400 text-sm">{category.questions} questions</span>
              </div>
              
              <button
                onClick={() => startQuiz(category.id)}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer bg-gradient-to-r ${category.color} text-white hover:shadow-xl`}
                style={{
                  boxShadow: `0 10px 30px ${category.color.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : category.color.includes('green') ? 'rgba(16, 185, 129, 0.3)' : category.color.includes('purple') ? 'rgba(147, 51, 234, 0.3)' : category.color.includes('cyan') ? 'rgba(6, 182, 212, 0.3)' : category.color.includes('orange') ? 'rgba(249, 115, 22, 0.3)' : 'rgba(147, 51, 234, 0.3)'}`
                }}
              >
                <i className="ri-play-line mr-2"></i>
                Start Quiz
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
          category={selectedCategory}
          difficulty={selectedDifficulty}
          language={selectedLanguage}
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
        userId={userProfile?.id}
      />
    </div>
  );
}