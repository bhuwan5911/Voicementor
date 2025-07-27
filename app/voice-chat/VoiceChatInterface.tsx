'use client';

import { useState, useEffect, useRef } from 'react';
import VoiceInput from './VoiceInput';
import ChatMessage from './ChatMessage';
import { translateText } from '@/lib/translationService';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'mentor';
  language: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface ChatMessage {
  id: string;
  senderId: number;
  senderName: string;
  originalText: string;
  translatedText: string;
  originalLanguage: string;
  translatedLanguage: string;
  timestamp: Date;
  isVoice: boolean;
}

interface VoiceChatInterfaceProps {
  user: User;
  selectedLanguage: string;
  availableLanguages: Language[];
}

export default function VoiceChatInterface({ user, selectedLanguage, availableLanguages }: VoiceChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [translationStatus, setTranslationStatus] = useState<'idle' | 'success' | 'error' | 'fallback'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Helper function to get language name
  const getLanguageName = (code: string) => {
    const language = availableLanguages.find(lang => lang.code === code);
    return language ? language.name : code.toUpperCase();
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset translation status after 3 seconds
  useEffect(() => {
    if (translationStatus !== 'idle') {
      const timer = setTimeout(() => {
        setTranslationStatus('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [translationStatus]);

  // Load connected users from database (mentors and students)
  useEffect(() => {
    const loadConnectedUsers = async () => {
      try {
        // Fetch all users (both mentors and students) from database
        const allUsersRes = await fetch('/api/users');
        if (allUsersRes.ok) {
          const allUsersData = await allUsersRes.json();
          const connectedUsersList = allUsersData.map((userData: any) => ({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role as 'student' | 'mentor',
            language: userData.profile?.languages ? JSON.parse(userData.profile.languages)[0] || 'en' : 'en'
          }));
          
          // Add current user if not already in list
          if (!connectedUsersList.find(u => u.id === user.id)) {
            connectedUsersList.push(user);
          }
          
          setConnectedUsers(connectedUsersList);
          console.log('Connected users loaded:', connectedUsersList);
        }
      } catch (error) {
        console.error('Error loading connected users:', error);
        // Fallback: just show current user
        setConnectedUsers([user]);
      }
    };

    loadConnectedUsers();
  }, [user]);

  const handleVoiceInput = async (text: string) => {
    if (!text.trim()) return;

    setIsTranslating(true);
    setTranslationStatus('idle');
    try {
      // Determine target language based on user role and connected users
      let targetLanguage = selectedLanguage; // Default to same language
      
      // Only translate if the user is speaking Hindi and there are English-speaking mentors
      if (selectedLanguage === 'hi') {
        // Check if there are English-speaking mentors who need translation
        const hasEnglishMentors = connectedUsers.some(u => 
          u.role === 'mentor' && u.language === 'en' && u.id !== user.id
        );
        if (hasEnglishMentors) {
          targetLanguage = 'en';
        }
      }

      console.log('Translating:', { text, from: selectedLanguage, to: targetLanguage });
      const translatedText = await translateText(text, selectedLanguage, targetLanguage);
      console.log('Translation result:', translatedText);
      
      // Check if translation was successful or used fallback
      const isFallback = translatedText === text || translatedText.toLowerCase() === text.toLowerCase();
      setTranslationStatus(isFallback ? 'fallback' : 'success');
      
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: user.id,
        senderName: user.name,
        originalText: text,
        translatedText: translatedText,
        originalLanguage: selectedLanguage,
        translatedLanguage: targetLanguage,
        timestamp: new Date(),
        isVoice: true
      };

      setMessages(prev => [...prev, newMessage]);
      setTranscription('');
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationStatus('error');
      // Add message with original text when translation fails
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: user.id,
        senderName: user.name,
        originalText: text,
        translatedText: text, // Use original text as fallback
        originalLanguage: selectedLanguage,
        translatedLanguage: selectedLanguage,
        timestamp: new Date(),
        isVoice: true
      };
      setMessages(prev => [...prev, newMessage]);
      setTranscription('');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTextInput = async () => {
    if (!inputText.trim() || isTranslating) return;

    setIsTranslating(true);
    setTranslationStatus('idle');
    try {
      // Determine target language based on user role and connected users
      let targetLanguage = selectedLanguage; // Default to same language
      
      // Only translate if the user is speaking Hindi and there are English-speaking mentors
      if (selectedLanguage === 'hi') {
        // Check if there are English-speaking mentors who need translation
        const hasEnglishMentors = connectedUsers.some(u => 
          u.role === 'mentor' && u.language === 'en' && u.id !== user.id
        );
        if (hasEnglishMentors) {
          targetLanguage = 'en';
        }
      }

      console.log('Translating text input:', { text: inputText, from: selectedLanguage, to: targetLanguage });
      const translatedText = await translateText(inputText, selectedLanguage, targetLanguage);
      console.log('Text translation result:', translatedText);

      // Check if translation was successful or used fallback
      const isFallback = translatedText === inputText || translatedText.toLowerCase() === inputText.toLowerCase();
      setTranslationStatus(isFallback ? 'fallback' : 'success');

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: user.id,
        senderName: user.name,
        originalText: inputText,
        translatedText: translatedText,
        originalLanguage: selectedLanguage,
        translatedLanguage: targetLanguage,
        timestamp: new Date(),
        isVoice: false
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationStatus('error');
      // Add message with original text when translation fails
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: user.id,
        senderName: user.name,
        originalText: inputText,
        translatedText: inputText, // Use original text as fallback
        originalLanguage: selectedLanguage,
        translatedLanguage: selectedLanguage,
        timestamp: new Date(),
        isVoice: false
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextInput();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[70vh]">
      {/* Connected Users Sidebar */}
      <div className="lg:col-span-1 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Connected Users</h3>
        <div className="space-y-3">
          {connectedUsers.map((connectedUser) => (
            <div
              key={connectedUser.id}
              className={`flex items-center space-x-3 p-3 rounded-xl border ${
                connectedUser.id === user.id
                  ? 'bg-cyan-500/20 border-cyan-500/30'
                  : 'bg-gray-700/30 border-gray-600/30'
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                {connectedUser.name[0]}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{connectedUser.name}</div>
                <div className="text-gray-400 text-sm capitalize">{connectedUser.role}</div>
              </div>
              <div className="text-sm text-gray-400">
                {availableLanguages.find(lang => lang.code === connectedUser.language)?.flag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-3 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl border border-purple-500/20 shadow-xl flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
          <div className="space-y-4 min-h-full">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <i className="ri-chat-3-line text-4xl mb-4"></i>
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isOwnMessage={message.senderId === user.id}
                  userLanguage={selectedLanguage}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-700/50">
          <div className="flex items-end space-x-4">
            {/* Voice Input */}
            <div className="flex-shrink-0">
              <VoiceInput
                onTranscription={handleVoiceInput}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                language={selectedLanguage}
              />
            </div>

            {/* Text Input */}
            <div className="flex-1">
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Type your message in ${availableLanguages.find(lang => lang.code === selectedLanguage)?.name}...`}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-cyan-500/50 transition-colors"
                  rows={2}
                  disabled={isTranslating}
                />
                <button
                  onClick={handleTextInput}
                  disabled={!inputText.trim() || isTranslating}
                  className="absolute bottom-2 right-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="ri-send-plane-line"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Translation Status */}
          {isTranslating && (
            <div className="mt-3 flex items-center justify-center text-cyan-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400 mr-2"></div>
              <span className="text-sm">Translating...</span>
            </div>
          )}
          
          {/* Translation Status Indicator */}
          {translationStatus !== 'idle' && !isTranslating && (
            <div className="mt-3 flex items-center justify-center">
              {translationStatus === 'success' && (
                <div className="flex items-center text-green-400">
                  <i className="ri-check-line mr-2"></i>
                  <span className="text-sm">Translation successful</span>
                </div>
              )}
              {translationStatus === 'fallback' && (
                <div className="flex items-center text-yellow-400">
                  <i className="ri-information-line mr-2"></i>
                  <span className="text-sm">Using fallback translation</span>
                </div>
              )}
              {translationStatus === 'error' && (
                <div className="flex items-center text-red-400">
                  <i className="ri-error-warning-line mr-2"></i>
                  <span className="text-sm">Translation failed - showing original text</span>
                </div>
              )}
            </div>
          )}

          {/* Demo Controls */}
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={async () => {
                // Test translation directly
                try {
                  const testText = "hi i wanna learn web development";
                  const translatedText = await translateText(testText, 'en', 'hi');
                  console.log('Translation test:', { original: testText, translated: translatedText });
                  
                  const demoMessage: ChatMessage = {
                    id: Date.now().toString(),
                    senderId: 2,
                    senderName: 'Bhuwan Kumar',
                    originalText: testText,
                    translatedText: translatedText,
                    originalLanguage: 'en',
                    translatedLanguage: 'hi',
                    timestamp: new Date(),
                    isVoice: true
                  };
                  setMessages(prev => [...prev, demoMessage]);
                } catch (error) {
                  console.error('Translation test failed:', error);
                }
              }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              <i className="ri-bug-line mr-1"></i>
              Test Translation
            </button>
            <button
              onClick={async () => {
                // Test multiple translation scenarios
                const testCases = [
                  { text: "hello", from: 'en', to: 'hi' },
                  { text: "thank you", from: 'en', to: 'hi' },
                  { text: "web development", from: 'en', to: 'hi' },
                  { text: "नमस्ते", from: 'hi', to: 'en' },
                  { text: "धन्यवाद", from: 'hi', to: 'en' }
                ];

                for (const testCase of testCases) {
                  try {
                    const translatedText = await translateText(testCase.text, testCase.from, testCase.to);
                    console.log(`Translation test (${testCase.from} -> ${testCase.to}):`, { 
                      original: testCase.text, 
                      translated: translatedText 
                    });
                    
                    const demoMessage: ChatMessage = {
                      id: Date.now().toString() + Math.random(),
                      senderId: 2,
                      senderName: 'Test User',
                      originalText: testCase.text,
                      translatedText: translatedText,
                      originalLanguage: testCase.from,
                      translatedLanguage: testCase.to,
                      timestamp: new Date(),
                      isVoice: false
                    };
                    setMessages(prev => [...prev, demoMessage]);
                    
                    // Add small delay between tests
                    await new Promise(resolve => setTimeout(resolve, 500));
                  } catch (error) {
                    console.error(`Translation test failed for ${testCase.text}:`, error);
                  }
                }
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              <i className="ri-test-tube-line mr-1"></i>
              Test Multiple
            </button>
            <button
              onClick={() => {
                const demoMessage: ChatMessage = {
                  id: Date.now().toString(),
                  senderId: 2,
                  senderName: 'Dr. Sarah Johnson',
                  originalText: 'Great! Let\'s start with HTML basics. HTML is the structure of web pages.',
                  translatedText: 'बहुत अच्छा! चलिए HTML के बुनियादी सिद्धांतों से शुरू करते हैं। HTML वेब पेजों की संरचना है।',
                  originalLanguage: 'en',
                  translatedLanguage: 'hi',
                  timestamp: new Date(),
                  isVoice: false
                };
                setMessages(prev => [...prev, demoMessage]);
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              <i className="ri-message-2-line mr-1"></i>
              Demo: Mentor Response
            </button>
            <button
              onClick={() => {
                const demoMessage: ChatMessage = {
                  id: Date.now().toString(),
                  senderId: 3,
                  senderName: 'Amit Kumar',
                  originalText: 'धन्यवाद! क्या आप मुझे एक सरल HTML उदाहरण दिखा सकते हैं?',
                  translatedText: 'Thank you! Can you show me a simple HTML example?',
                  originalLanguage: 'hi',
                  translatedLanguage: 'en',
                  timestamp: new Date(),
                  isVoice: true
                };
                setMessages(prev => [...prev, demoMessage]);
              }}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-600 hover:to-cyan-700 transition-all"
            >
              <i className="ri-mic-line mr-1"></i>
              Demo: Student Voice
            </button>
          </div>

          {/* Voice Transcription */}
          {transcription && (
            <div className="mt-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
              <p className="text-gray-300 text-sm mb-2">You said:</p>
              <p className="text-cyan-400 font-medium">{transcription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 