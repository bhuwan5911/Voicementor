
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import ProgressTracker from './ProgressTracker';
import MentorCard from './MentorCard';
import VoiceRecorder from './VoiceRecorder';
import Link from 'next/link';
import RewardSystem from '../achievements/RewardSystem'; // Added import for RewardSystem

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const router = useRouter();
  const [showRewards, setShowRewards] = useState(false); // Added state for RewardSystem

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      // Fetch profile from backend
      const res = await fetch(`/api/users?email=${user.email}`);
      const users = await res.json();
      if (users && users.length > 0) {
        setProfile(users[0]);
        // Fetch quizzes for this user
        const quizRes = await fetch(`/api/quizzes?userId=${users[0].id}`);
        const userQuizzes = await quizRes.json();
        setQuizzes(userQuizzes);
        // Calculate points and level (example logic: 10 points per quiz, level up every 5 quizzes)
        const quizCount = userQuizzes.length;
        setPoints(quizCount * 10);
        setLevel(Math.floor(quizCount / 5) + 1);
      } else {
        // User exists but no profile - set profile to null to indicate this state
        setProfile(null);
      }
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Show loading while fetching user data
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="text-white mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If user is logged in but has no profile, show a message to complete profile
  if (user && profile === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-user-settings-line text-3xl text-white"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Complete Your Profile</h2>
          <p className="text-gray-300 mb-6">
            To access the dashboard and start taking quizzes, please complete your profile setup.
          </p>
          <button
            onClick={() => router.push('/onboarding')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
          >
            <i className="ri-arrow-right-line mr-2"></i>
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  // If profile is still loading (undefined), show loading
  if (profile === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="text-white mt-4">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Example recommended mentors (replace with real data if available)
  const recommendedMentors = [
    {
      id: 1,
      name: 'Priya Sharma',
      expertise: 'Web Development',
      languages: ['Hindi', 'English'],
      rating: 4.8,
      sessions: 150,
      image: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20female%20software%20developer%20mentor%2C%20friendly%20smile%2C%20wearing%20casual%20business%20attire%2C%20modern%20office%20background%2C%20confident%20and%20approachable%2C%20high%20quality%20portrait%20photography&width=200&height=200&seq=mentor-1&orientation=squarish',
      isOnline: true
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      expertise: 'Mobile Development',
      languages: ['Hindi', 'Gujarati', 'English'],
      rating: 4.9,
      sessions: 200,
      image: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20male%20software%20developer%20mentor%2C%20warm%20smile%2C%20wearing%20casual%20shirt%2C%20modern%20tech%20workspace%2C%20experienced%20and%20friendly%2C%20high%20quality%20portrait%20photography&width=200&height=200&seq=mentor-2&orientation=squarish',
      isOnline: false
    }
  ];

  // Real quiz data
  const quizzesCompleted = quizzes.length;
  const pointsEarned = points;
  const currentLevel = level || 1; // Ensure level is at least 1
  // Live accuracy calculation
  const totalCorrect = quizzes.reduce((sum, q) => sum + (q.correctAnswers || 0), 0);
  const totalAnswered = quizzes.reduce((sum, q) => sum + (q.totalAnswers || 0), 0);
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // User progress data
  const userProgress = {
    name: profile?.name || 'Bhuwan', // Default to Bhuwan if no profile name
    level: currentLevel,
    totalPoints: pointsEarned,
    quizzesCompleted: quizzesCompleted,
    accuracy: accuracy
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col">
      <nav className="bg-gray-800/80 backdrop-blur-sm border-b border-purple-500/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')} 
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-colors"
          >
            <i className="ri-arrow-left-line mr-2"></i> Back
          </button>
          <button
            onClick={() => setShowRewards(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-colors"
          >
            <i className="ri-trophy-line mr-2"></i> My Rewards
          </button>
          <span className="font-pacifico text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">VoiceBridge</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900"
        >
          Logout
        </button>
      </nav>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Quiz Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900/60 to-cyan-900/60 rounded-2xl p-6 border border-blue-500/30 flex flex-col items-center">
            <div className="text-3xl font-bold text-cyan-400 mb-1">{currentLevel}</div>
            <div className="text-gray-300 text-sm">Current Level</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 rounded-2xl p-6 border border-purple-500/30 flex flex-col items-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">{pointsEarned}</div>
            <div className="text-gray-300 text-sm">Total Points</div>
          </div>
          <div className="bg-gradient-to-br from-green-900/60 to-emerald-900/60 rounded-2xl p-6 border border-green-500/30 flex flex-col items-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{quizzesCompleted}</div>
            <div className="text-gray-300 text-sm">Quizzes Done</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-900/60 to-orange-900/60 rounded-2xl p-6 border border-yellow-500/30 flex flex-col items-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">{accuracy}%</div>
            <div className="text-gray-300 text-sm">Accuracy</div>
          </div>
        </div>
        {/* Reset Progress Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={async () => {
              if (!profile?.id) return;
              await fetch(`/api/quizzes?userId=${profile.id}`, { method: 'DELETE' });
              window.location.reload();
            }}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-pink-700 transition-colors shadow-lg"
          >
            <i className="ri-refresh-line mr-2"></i> Reset Progress
          </button>
        </div>
        {/* Profile Summary & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 shadow-2xl flex flex-col gap-6 md:col-span-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">Welcome back, {userProgress.name}!</h1>
            <p className="text-gray-300 mb-4">Ready to continue your coding journey?</p>
            <VoiceRecorder onRecordingChange={() => {}} />
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 mt-4">
              <button onClick={() => router.push('/quiz')} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors flex items-center gap-2"><i className="ri-play-line"></i> Start New Quiz</button>
              <button onClick={() => router.push('/profile')} className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition-colors flex items-center gap-2"><i className="ri-user-settings-line"></i> Edit Profile</button>
              <button onClick={() => router.push('/voice-upload')} className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-colors flex items-center gap-2"><i className="ri-mic-line"></i> Upload Voice</button>
                      </div>
                    </div>
          {/* Profile Summary */}
          <div className="bg-gradient-to-br from-indigo-800/80 to-purple-900/80 rounded-3xl p-8 border border-indigo-500/30 shadow-lg flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-4xl text-white font-bold mb-2">
              {profile.profile?.avatarUrl ? <img src={profile.profile.avatarUrl} alt="avatar" className="w-24 h-24 rounded-full object-cover" /> : profile.name[0]}
                  </div>
            <div className="text-white text-xl font-semibold">{profile.name}</div>
            <div className="text-gray-300 text-sm">{profile.email}</div>
            <div className="text-gray-400 text-sm">{profile.profile?.location || 'Unknown'}</div>
            <Link href="/profile" className="mt-2 text-cyan-400 hover:underline">View Full Profile</Link>
                </div>
              </div>
        {/* Notifications */}
        {/* Progress & Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 flex flex-col gap-8">
            <div className="bg-gradient-to-br from-purple-800/60 to-indigo-900/60 rounded-3xl p-8 border border-pink-500/20 shadow-xl flex flex-col gap-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">Test Your Knowledge</h2>
                  <p className="text-gray-300">Challenge yourself and earn rewards</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                  <i className="ri-trophy-line text-2xl text-white"></i>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20 flex flex-col items-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{quizzesCompleted}</div>
                  <div className="text-gray-400">Quizzes Completed</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/20 flex flex-col items-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{pointsEarned}</div>
                  <div className="text-gray-400">Points Earned</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/20 flex flex-col items-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">Level {currentLevel}</div>
                  <div className="text-gray-400">Current Level</div>
                </div>
              </div>
              <button
                className="mt-2 inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-pink-500/25 whitespace-nowrap cursor-pointer"
                onClick={() => router.push('/quiz')}
              >
                <i className="ri-play-line mr-2"></i>
                Start New Quiz
              </button>
            </div>
            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
              <ul className="divide-y divide-gray-700">
                {quizzes.slice(0, 5).map((quiz, idx) => (
                  <li key={quiz.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
                    <span className="text-gray-200">Quiz: <span className="font-semibold text-cyan-400">{quiz.question}</span></span>
                    <span className="text-gray-400 text-sm">{new Date(quiz.createdAt).toLocaleString()}</span>
                  </li>
                ))}
                {quizzes.length === 0 && <li className="py-3 text-gray-400">No recent quizzes yet.</li>}
              </ul>
            </div>
          </div>
          {/* Progress Chart (Placeholder) */}
          <div className="bg-gradient-to-br from-indigo-800/80 to-purple-900/80 rounded-3xl p-8 border border-indigo-500/30 shadow-lg flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold text-white mb-4">Progress Chart</h2>
            <div className="w-full h-40 flex items-center justify-center text-gray-400 bg-gray-900/40 rounded-xl">
              {/* Placeholder for chart - integrate chart.js or similar for real chart */}
              Coming soon: Visualize your quiz progress!
            </div>
          </div>
        </div>
        {/* Progress Tracker (Badges, Goals) */}
        <div className="bg-gradient-to-r from-green-600/80 to-teal-700/80 backdrop-blur-sm p-8 rounded-3xl text-white border border-green-500/30 shadow-lg shadow-green-500/20 flex flex-col gap-6 mt-8">
          <ProgressTracker user={{
            ...userProgress,
            progress: quizzesCompleted * 20, // Example: 5 quizzes = 100%
            badges: profile.achievements?.map(a => a.title) || [],
            goal: profile.profile?.goals || 'No goal set',
          }} />
      </div>
      {/* Rewards System Modal */}
      <RewardSystem
        isOpen={showRewards}
        onClose={() => setShowRewards(false)}
        userLevel={userProgress.level}
        totalPoints={userProgress.totalPoints}
        userId={profile?.id}
      />
    </main>
    </div>
  );
}
