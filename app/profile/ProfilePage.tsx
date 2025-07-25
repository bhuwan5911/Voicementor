'use client';

import { useState } from 'react';

interface UserProfile {
  name: string;
  age: number;
  location: string;
  email: string;
  phone: string;
  languages: string[];
  interests: string[];
  learningGoals: string[];
  skillLevel: string;
  joinDate: string;
  totalPoints: number;
  currentLevel: number;
  completedCourses: number;
  studyHours: number;
  badges: Badge[];
  achievements: Achievement[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedDate: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  date: string;
  category: string;
}

interface ProfilePageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfilePage({ isOpen, onClose }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Sameer Kumar',
    age: 19,
    location: 'Rural Maharashtra, India',
    email: 'sameer.kumar@email.com',
    phone: '+91 9876543210',
    languages: ['Hindi', 'Marathi', 'English'],
    interests: ['Web Development', 'Programming', 'Mobile Apps', 'AI Technology'],
    learningGoals: [
      'Build professional portfolio website',
      'Learn React and modern JavaScript',
      'Get internship at tech company',
      'Help digitize local businesses'
    ],
    skillLevel: 'Intermediate',
    joinDate: '2024-01-15',
    totalPoints: 1250,
    currentLevel: 5,
    completedCourses: 8,
    studyHours: 156,
    badges: [
      {
        id: '1',
        name: 'First Steps',
        description: 'Completed your first lesson',
        icon: 'ri-star-line',
        color: 'from-yellow-500 to-orange-600',
        earnedDate: '2024-01-16'
      },
      {
        id: '2',
        name: 'Voice Champion',
        description: 'Used voice features 50+ times',
        icon: 'ri-mic-line',
        color: 'from-purple-500 to-pink-600',
        earnedDate: '2024-02-10'
      },
      {
        id: '3',
        name: 'Quiz Master',
        description: 'Scored 90%+ on 10 quizzes',
        icon: 'ri-trophy-line',
        color: 'from-green-500 to-emerald-600',
        earnedDate: '2024-02-25'
      },
      {
        id: '4',
        name: 'Community Helper',
        description: 'Helped 20+ fellow learners',
        icon: 'ri-heart-line',
        color: 'from-red-500 to-pink-600',
        earnedDate: '2024-03-05'
      },
      {
        id: '5',
        name: 'Code Explorer',
        description: 'Completed programming basics',
        icon: 'ri-code-line',
        color: 'from-blue-500 to-indigo-600',
        earnedDate: '2024-03-12'
      },
      {
        id: '6',
        name: 'Translation Pro',
        description: 'Used translation tools 100+ times',
        icon: 'ri-translate-2-line',
        color: 'from-cyan-500 to-blue-600',
        earnedDate: '2024-03-18'
      }
    ],
    achievements: [
      {
        id: '1',
        title: 'First Quiz Completed',
        description: 'Successfully completed your first programming quiz',
        points: 50,
        date: '2024-01-20',
        category: 'Learning'
      },
      {
        id: '2',
        title: 'Week Streak',
        description: 'Studied for 7 consecutive days',
        points: 100,
        date: '2024-02-01',
        category: 'Consistency'
      },
      {
        id: '3',
        title: 'Voice Session Master',
        description: 'Completed 25 voice learning sessions',
        points: 150,
        date: '2024-02-15',
        category: 'Engagement'
      },
      {
        id: '4',
        title: 'Level Up Champion',
        description: 'Reached Level 5 in record time',
        points: 200,
        date: '2024-03-01',
        category: 'Progress'
      },
      {
        id: '5',
        title: 'Peer Mentor',
        description: 'Helped 10 fellow students with their learning',
        points: 250,
        date: '2024-03-10',
        category: 'Community'
      }
    ]
  });

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'learning': return 'text-blue-400 bg-blue-500/20';
      case 'consistency': return 'text-green-400 bg-green-500/20';
      case 'engagement': return 'text-purple-400 bg-purple-500/20';
      case 'progress': return 'text-yellow-400 bg-yellow-500/20';
      case 'community': return 'text-pink-400 bg-pink-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // Here you would typically save the profile data
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-purple-500/20 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{userProfile.name.charAt(0)}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                  <i className="ri-check-line text-white text-xs"></i>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{userProfile.name}</h2>
                <p className="text-purple-300 text-lg">Level {userProfile.currentLevel} Learner</p>
                <p className="text-gray-400">{userProfile.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25 cursor-pointer"
              >
                <i className={`${isEditing ? 'ri-save-line' : 'ri-edit-line'} mr-2`}></i>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-800/30 border-b border-gray-700/50">
          <div className="flex">
            {['overview', 'achievements', 'badges', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-medium transition-colors cursor-pointer capitalize ${
                  activeTab === tab
                    ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-500/10'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <i className={`${
                  tab === 'overview' ? 'ri-user-line' :
                  tab === 'achievements' ? 'ri-trophy-line' :
                  tab === 'badges' ? 'ri-medal-line' :
                  'ri-settings-line'
                } mr-2`}></i>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Stats Cards */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-500/30">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{userProfile.totalPoints}</div>
                    <div className="text-gray-400 text-sm">Total Points</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 border border-blue-500/30">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{userProfile.currentLevel}</div>
                    <div className="text-gray-400 text-sm">Current Level</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30">
                    <div className="text-2xl font-bold text-green-400 mb-1">{userProfile.completedCourses}</div>
                    <div className="text-gray-400 text-sm">Courses Done</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 border border-yellow-500/30">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">{userProfile.studyHours}h</div>
                    <div className="text-gray-400 text-sm">Study Hours</div>
                  </div>
                </div>

                {/* Learning Progress */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">Learning Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Programming Fundamentals</span>
                        <span className="text-green-400 font-semibold">Completed</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full h-2 w-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Web Development</span>
                        <span className="text-blue-400 font-semibold">75%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-2 w-3/4"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Mobile App Development</span>
                        <span className="text-yellow-400 font-semibold">40%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full h-2 w-2/5"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">Completed "Advanced JavaScript" quiz</span>
                      <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-xl">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300">Started voice session with mentor</span>
                      <span className="text-gray-500 text-sm ml-auto">1 day ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-xl">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-300">Earned "Translation Pro" badge</span>
                      <span className="text-gray-500 text-sm ml-auto">3 days ago</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm">Full Name</label>
                      <div className="text-white">{userProfile.name}</div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Age</label>
                      <div className="text-white">{userProfile.age} years</div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Location</label>
                      <div className="text-white">{userProfile.location}</div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Member Since</label>
                      <div className="text-white">{new Date(userProfile.joinDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.languages.map((language, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">Learning Goals</h3>
                  <div className="space-y-2">
                    {userProfile.learningGoals.map((goal, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <i className="ri-target-line text-purple-400 text-sm mt-1"></i>
                        <span className="text-gray-300 text-sm">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Your Achievements</h3>
                <p className="text-gray-400">Milestones you've reached on your learning journey</p>
              </div>

              <div className="space-y-4">
                {userProfile.achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
                          <i className="ri-trophy-line text-xl text-white"></i>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{achievement.title}</h4>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(achievement.category)}`}>
                              {achievement.category}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {new Date(achievement.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">+{achievement.points}</div>
                        <div className="text-gray-400 text-sm">points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Badge Collection</h3>
                <p className="text-gray-400">Special recognition for your learning milestones</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProfile.badges.map((badge) => (
                  <div key={badge.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${badge.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <i className={`${badge.icon} text-2xl text-white`}></i>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{badge.name}</h4>
                    <p className="text-gray-400 text-sm mb-3">{badge.description}</p>
                    <p className="text-gray-500 text-xs">
                      Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Profile Settings</h3>
                <p className="text-gray-400">Customize your learning experience</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                    <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                        <input
                          type="email"
                          value={userProfile.email}
                          className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                          readOnly={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={userProfile.phone}
                          className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                    <h4 className="text-lg font-semibold text-white mb-4">Learning Preferences</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Preferred Study Time</label>
                        <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none pr-8">
                          <option>Morning (6AM - 12PM)</option>
                          <option>Afternoon (12PM - 6PM)</option>
                          <option>Evening (6PM - 10PM)</option>
                          <option>Night (10PM - 12AM)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Daily Study Goal</label>
                        <select className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none pr-8">
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>2 hours</option>
                          <option>3+ hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                    <h4 className="text-lg font-semibold text-white mb-4">Notification Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Study Reminders</span>
                        <div className="w-12 h-6 bg-purple-500 rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Achievement Notifications</span>
                        <div className="w-12 h-6 bg-purple-500 rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Mentor Messages</span>
                        <div className="w-12 h-6 bg-purple-500 rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                    <h4 className="text-lg font-semibold text-white mb-4">Privacy Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Profile Visibility</span>
                        <div className="w-12 h-6 bg-green-500 rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Show Learning Progress</span>
                        <div className="w-12 h-6 bg-green-500 rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Allow Peer Connections</span>
                        <div className="w-12 h-6 bg-green-500 rounded-full p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProfileUpdate}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25 cursor-pointer"
                  >
                    Save Changes
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