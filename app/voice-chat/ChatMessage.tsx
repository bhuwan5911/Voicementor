'use client';

import { useState } from 'react';

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

interface ChatMessageProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  userLanguage: string;
}

export default function ChatMessage({ message, isOwnMessage, userLanguage }: ChatMessageProps) {
  const [showOriginal, setShowOriginal] = useState(false);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      'hi': 'Hindi',
      'en': 'English',
      'pa': 'Punjabi',
      'bn': 'Bengali',
      'te': 'Telugu',
      'ta': 'Tamil',
      'mr': 'Marathi',
      'gu': 'Gujarati',
      'kn': 'Kannada',
      'ml': 'Malayalam'
    };
    return languages[code] || code;
  };

  // Check if translation was successful or used fallback
  const isTranslationSuccessful = message.translatedText !== message.originalText;
  const isTranslationFallback = !isTranslationSuccessful && message.translatedLanguage !== message.originalLanguage;
  const isTranslationError = !isTranslationSuccessful && message.translatedLanguage === message.originalLanguage;

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        {/* Avatar */}
        <div className={`flex items-center space-x-2 mb-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
          {!isOwnMessage && (
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {message.senderName[0]}
            </div>
          )}
          <div className={`text-sm ${isOwnMessage ? 'text-right' : 'text-left'}`}>
            <div className="text-gray-300 font-medium">{message.senderName}</div>
            <div className="text-gray-500 text-xs">{formatTime(message.timestamp)}</div>
          </div>
          {isOwnMessage && (
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {message.senderName[0]}
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`rounded-2xl p-4 ${
          isOwnMessage 
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
            : 'bg-gray-700/50 text-white border border-gray-600/30'
        }`}>
          {/* Voice Indicator */}
          {message.isVoice && (
            <div className="flex items-center space-x-2 mb-2">
              <i className="ri-mic-line text-sm"></i>
              <span className="text-xs opacity-80">Voice Message</span>
            </div>
          )}

          {/* Translation Status Indicator */}
          {isTranslationError && (
            <div className="flex items-center space-x-2 mb-2 text-red-300">
              <i className="ri-error-warning-line text-sm"></i>
              <span className="text-xs">Translation failed</span>
            </div>
          )}
          {isTranslationFallback && (
            <div className="flex items-center space-x-2 mb-2 text-yellow-300">
              <i className="ri-information-line text-sm"></i>
              <span className="text-xs">Using fallback translation</span>
            </div>
          )}

          {/* Translated Text (Primary) */}
          <div className="mb-2">
            <div className="text-sm opacity-80 mb-1 flex items-center">
              {getLanguageName(message.translatedLanguage)}
              {isTranslationSuccessful && (
                <i className="ri-check-line ml-1 text-green-300"></i>
              )}
            </div>
            <div className="font-medium">{message.translatedText}</div>
          </div>

          {/* Original Text (Toggleable) */}
          <div className="border-t border-white/20 pt-2">
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="text-xs opacity-70 hover:opacity-100 transition-opacity mb-1"
            >
              {showOriginal ? 'Hide' : 'Show'} Original ({getLanguageName(message.originalLanguage)})
            </button>
            {showOriginal && (
              <div className="text-sm opacity-80 italic">
                "{message.originalText}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 