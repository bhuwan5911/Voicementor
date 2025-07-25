
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';

function LoginModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) alert(error.message);
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{ backdropFilter: 'blur(2px)' }}
    >
      <div className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm w-full animate-fadeIn relative">
        <h2 className="text-3xl font-extrabold mb-3 text-gray-900 tracking-tight">Sign Up / Login</h2>
        <p className="mb-8 text-gray-500 text-lg">Please sign in to continue</p>
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200"
        >
          <svg className="w-6 h-6" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3C34.7 32.1 29.8 35 24 35c-6.1 0-11.3-4.1-13.1-9.6-0.4-1-0.6-2-0.6-3.1s0.2-2.1 0.6-3.1C12.7 12.1 17.9 8 24 8c3.1 0 6 1.1 8.2 2.9l6.2-6.2C34.6 1.7 29.6 0 24 0 14.8 0 6.7 5.8 2.7 14.1c-0.6 1.2-0.9 2.6-0.9 4s0.3 2.8 0.9 4C6.7 42.2 14.8 48 24 48c5.6 0 10.6-1.7 14.4-4.7l-6.2-6.2C30 38.9 27.1 40 24 40c-5.8 0-10.7-2.9-13.3-7.5C10.7 35.1 17.1 40 24 40c5.8 0 10.7-2.9 13.3-7.5C44.7 29.1 48 24.1 48 18.1c0-1.4-0.3-2.8-0.9-4C47.3 5.8 39.2 0 30 0c-5.6 0-10.6 1.7-14.4 4.7l6.2 6.2C18 9.1 21 8 24 8c6.1 0 11.3 4.1 13.1 9.6 0.4 1 0.6 2 0.6 3.1s-0.2 2.1-0.6 3.1C35.3 35.9 30.1 40 24 40c-3.1 0-6-1.1-8.2-2.9l-6.2 6.2C13.4 46.3 18.4 48 24 48c9.2 0 17.3-5.8 21.3-14.1 0.6-1.2 0.9-2.6 0.9-4s-0.3-2.8-0.9-4z"/></g></svg>
          Sign in with Google
        </button>
        <button
          onClick={onClose}
          className="mt-6 text-gray-400 hover:text-gray-700 text-base transition-colors"
        >
          Cancel
        </button>
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeInModal 0.3s ease;
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkUser();
  }, []);

  const handleProtectedClick = (url: string) => {
    if (!isLoggedIn) {
      setShowLogin(true);
    } else {
      router.push(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a40] via-[#3a1c71] to-[#5f2c82] flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-transparent">
        <span className="font-pacifico text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">VoiceBridge</span>
        <div className="flex items-center gap-6">
          <Link href="/features" className="text-white font-semibold hover:text-cyan-300 transition-colors">Features</Link>
          <Link href="/about" className="text-white font-semibold hover:text-cyan-300 transition-colors">About</Link>
          <button
            onClick={() => handleProtectedClick('/dashboard')}
            className="text-white font-semibold hover:text-cyan-300 transition-colors bg-transparent border-none cursor-pointer"
          >
            Dashboard
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-colors"
          >
            Sign Up / Login
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 leading-tight font-pacifico">
                Break Language Barriers with Voice
              </h1>
              <p className="text-xl text-white mb-8 leading-relaxed">
                Connect rural youth with global opportunities through AI-powered voice translation and expert mentorship. Learn coding, build skills, and transform your future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleProtectedClick('/onboarding')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-cyan-500/25 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-rocket-line mr-2"></i>
                  Start Your Journey
                </button>
                <button
                  onClick={() => handleProtectedClick('/quiz')}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl shadow-pink-500/25 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-trophy-line mr-2"></i>
                  Take Quiz Challenge
                </button>
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/25">
                      <i className="ri-mic-line text-3xl text-white"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Voice-First Learning</h3>
                    <p className="text-gray-300">Speak naturally in your language</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-700/50 rounded-xl p-4 border border-cyan-500/20">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">Live Translation</span>
                      </div>
                      <p className="text-white text-sm">"मुझे कोडिंग सीखना है"</p>
                      <p className="text-cyan-400 text-sm">→ "I want to learn coding"</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-purple-500/20 rounded-lg p-3 text-center border border-purple-500/30">
                        <div className="text-2xl font-bold text-purple-400">15+</div>
                        <div className="text-xs text-gray-400">Languages</div>
                      </div>
                      <div className="bg-cyan-500/20 rounded-lg p-3 text-center border border-cyan-500/30">
                        <div className="text-2xl font-bold text-cyan-400">500+</div>
                        <div className="text-xs text-gray-400">Mentors</div>
                      </div>
                      <div className="bg-pink-500/20 rounded-lg p-3 text-center border border-pink-500/30">
                        <div className="text-2xl font-bold text-pink-400">95%</div>
                        <div className="text-xs text-gray-400">Success</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Powerful Features for Rural Youth
            </h2>
            <p className="text-xl text-white">Everything you need to transform your career</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-mic-line',
                title: 'Voice-First Communication',
                description: 'Speak naturally in your native language. AI handles the rest.',
                color: 'from-cyan-500 to-blue-600',
                shadowColor: 'shadow-cyan-500/20'
              },
              {
                icon: 'ri-translate-2-line',
                title: 'Smart Translation',
                description: 'Real-time translation between 15+ Indian languages.',
                color: 'from-green-500 to-emerald-600',
                shadowColor: 'shadow-green-500/20'
              },
              {
                icon: 'ri-trophy-line',
                title: 'Gamified Learning',
                description: 'Earn badges, points, and certificates as you progress.',
                color: 'from-yellow-500 to-orange-600',
                shadowColor: 'shadow-yellow-500/20'
              },
              {
                icon: 'ri-group-line',
                title: 'Expert Mentors',
                description: 'Connect with industry professionals who understand your journey.',
                color: 'from-purple-500 to-pink-600',
                shadowColor: 'shadow-purple-500/20'
              },
              {
                icon: 'ri-questionnaire-line',
                title: 'Interactive Quizzes',
                description: 'Test your knowledge with voice-based quizzes and challenges.',
                color: 'from-indigo-500 to-purple-600',
                shadowColor: 'shadow-indigo-500/20'
              },
              {
                icon: 'ri-smartphone-line',
                title: 'Works Everywhere',
                description: 'Optimized for basic smartphones and poor internet.',
                color: 'from-teal-500 to-cyan-600',
                shadowColor: 'shadow-teal-500/20'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${feature.shadowColor}`}>
                  <i className={`${feature.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Quiz Challenge Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20 shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-pink-500/25">
              <i className="ri-trophy-line text-4xl text-white"></i>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Test Your Knowledge
            </h2>
            <p className="text-xl text-white mb-8">
              Challenge yourself with interactive voice quizzes. Earn points, unlock badges, and level up your skills!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Voice</div>
                <div className="text-white">Interactive Quizzes</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
                <div className="text-3xl font-bold text-purple-400 mb-2">Rewards</div>
                <div className="text-white">Badges & Certificates</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-pink-500/20">
                <div className="text-3xl font-bold text-pink-400 mb-2">Progress</div>
                <div className="text-white">Level Up System</div>
              </div>
            </div>
            <button
              onClick={() => handleProtectedClick('/quiz')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-xl text-xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl shadow-pink-500/25 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-play-line mr-3"></i>
              Start Quiz Challenge
            </button>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Your Tech Career Starts Here
          </h2>
          <p className="text-xl text-white mb-8">
            Join thousands of rural youth already transforming their futures with VoiceBridge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleProtectedClick('/onboarding')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-cyan-500/25 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-user-add-line mr-2"></i>
              Join Now - Free
            </button>
            <Link href="/features" className="border-2 border-purple-500 text-purple-400 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 whitespace-nowrap cursor-pointer">
              <i className="ri-eye-line mr-2"></i>
              Explore Features
            </Link>
          </div>
        </div>
      </section>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
