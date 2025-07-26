
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
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200"
        >
          <span className="bg-white rounded-full p-1 flex items-center justify-center">
            <svg className="w-6 h-6" viewBox="0 0 48 48">
              <g>
                <path fill="#4285F4" d="M24 9.5c3.54 0 6.36 1.46 7.82 2.68l5.8-5.8C34.64 3.13 29.74 1 24 1 14.82 1 6.7 6.82 2.7 15.1l6.7 5.2C11.7 13.82 17.3 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.74H24v9.04h12.4c-.54 2.9-2.18 5.36-4.64 7.04l7.2 5.6C43.3 37.18 46.1 31.36 46.1 24.5z"/>
                <path fill="#FBBC05" d="M9.4 28.3c-1.1-2.1-1.7-4.5-1.7-7.1s.6-5 1.7-7.1l-6.7-5.2C1.1 13.18 0 18.64 0 24.5s1.1 11.32 2.7 15.1l6.7-5.2z"/>
                <path fill="#EA4335" d="M24 46c6.48 0 11.92-2.14 15.9-5.82l-7.2-5.6c-2.02 1.36-4.6 2.16-8.7 2.16-6.7 0-12.3-4.32-14.6-10.1l-6.7 5.2C6.7 41.18 14.82 46 24 46z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </g>
            </svg>
          </span>
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

function ProfileDropdown({ user, onLogout }: { user: any, onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase();
  const avatarUrl = user?.user_metadata?.avatar_url;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 focus:outline-none"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" className="w-9 h-9 rounded-full border-2 border-blue-400" />
        ) : (
          <span className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg border-2 border-blue-400">
            {initials}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-4 z-50 border border-gray-200">
          <div className="px-4 pb-2 flex flex-col items-center">
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="w-14 h-14 rounded-full mb-2 border-2 border-blue-400" />
            ) : (
              <span className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl mb-2 border-2 border-blue-400">
                {initials}
              </span>
            )}
            <div className="font-semibold text-gray-900">{user.user_metadata?.full_name || user.email}</div>
            <div className="text-gray-500 text-sm mb-2">{user.email}</div>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setUser(user);
    };
    checkUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
      setUser(session?.user || null);
      if (session?.user) setShowLogin(false);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleProtectedClick = (url: string) => {
    if (!isLoggedIn) {
      setShowLogin(true);
    } else {
      router.push(url);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsLoggedIn(false);
    setShowLogin(false);
    router.push('/');
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
          {isLoggedIn && user ? (
            <ProfileDropdown user={user} onLogout={handleLogout} />
          ) : (
              <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-colors"
              >
              Sign Up / Login
              </button>
          )}
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
                icon: (
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 mb-4">
                    <i className="ri-mic-line text-2xl text-white"></i>
                  </span>
                ),
                title: 'Voice-First Communication',
                description: 'Speak naturally in your native language. AI handles the rest.',
              },
              {
                icon: (
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <g>
                        <path d="M4 5h7M7.5 5v14M4 19h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M14 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.21-1.79 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16 16l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <text x="13" y="10" fontSize="6" fill="currentColor" fontFamily="Arial" fontWeight="bold">A</text>
                      </g>
                    </svg>
                  </span>
                ),
                title: 'Smart Translation',
                description: 'Real-time translation between 15+ Indian languages.',
              },
              {
                icon: (
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 mb-4">
                    <i className="ri-trophy-line text-2xl text-white"></i>
                  </span>
                ),
                title: 'Gamified Learning',
                description: 'Earn badges, points, and certificates as you progress.',
              },
              {
                icon: (
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
                    <i className="ri-group-line text-2xl text-white"></i>
                  </span>
                ),
                title: 'Expert Mentors',
                description: 'Connect with industry professionals who understand your journey.',
              },
              {
                icon: (
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
                    <i className="ri-questionnaire-line text-2xl text-white"></i>
                  </span>
                ),
                title: 'Interactive Quizzes',
                description: 'Test your knowledge with voice-based quizzes and challenges.',
              },
              {
                icon: (
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 mb-4">
                    <i className="ri-smartphone-line text-2xl text-white"></i>
                  </span>
                ),
                title: 'Works Everywhere',
                description: 'Optimized for basic smartphones and poor internet.',
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                {feature.icon}
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
