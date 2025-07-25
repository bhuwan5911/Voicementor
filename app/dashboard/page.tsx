
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import ProgressTracker from './ProgressTracker';
import MentorCard from './MentorCard';
import VoiceRecorder from './VoiceRecorder';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

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
      }
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user || !profile) return null;

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
  const quizzesCompleted = profile.quizzes ? profile.quizzes.length : 0;
  const pointsEarned = profile.points || 0; // You can calculate this based on your logic
  const currentLevel = profile.level || 1; // You can calculate this based on your logic

  // User progress data
  const userProgress = {
    name: profile.name,
    location: profile.profile?.location || 'Unknown',
    goal: profile.profile?.bio || 'No goal set',
    progress: profile.progress || 0,
    badges: profile.achievements?.map(a => a.title) || [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col">
      <nav className="bg-gray-800/80 backdrop-blur-sm border-b border-purple-500/20 px-4 py-3 flex items-center justify-between">
        <span className="font-pacifico text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">VoiceBridge</span>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900"
        >
          Logout
        </button>
      </nav>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 shadow-2xl flex flex-col gap-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">Welcome back, {userProgress.name}!</h1>
            <p className="text-gray-300 mb-4">Ready to continue your coding journey?</p>
            <VoiceRecorder onRecordingChange={() => {}} />
          </div>
          <div className="bg-gradient-to-r from-green-600/80 to-teal-700/80 backdrop-blur-sm p-8 rounded-3xl text-white border border-green-500/30 shadow-lg shadow-green-500/20 flex flex-col gap-6">
            <ProgressTracker user={userProgress} />
          </div>
        </div>
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
          <button className="mt-2 inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-pink-500/25 whitespace-nowrap cursor-pointer">
            <i className="ri-play-line mr-2"></i>
            Start New Quiz
          </button>
        </div>
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Recommended Mentors</h2>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm font-medium">Available Now</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
