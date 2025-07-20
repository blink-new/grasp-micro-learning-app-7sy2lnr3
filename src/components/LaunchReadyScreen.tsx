import React, { useState, useEffect } from 'react';
import { ArrowRight, Brain, Zap, Target, Clock } from 'lucide-react';

interface LaunchReadyScreenProps {
  conceptCount: number;
  onStart: () => void;
}

const previewCards = [
  {
    title: "Neural Networks",
    preview: "Think of neural networks like your brain's neurons...",
    type: "concept",
    difficulty: "beginner"
  },
  {
    title: "Machine Learning",
    preview: "A simple cycle: collect data, train, predict...",
    type: "process",
    difficulty: "intermediate"
  },
  {
    title: "Deep Learning",
    preview: "Like looking through multiple photo filters...",
    type: "analogy",
    difficulty: "beginner"
  }
];

const LaunchReadyScreen: React.FC<LaunchReadyScreenProps> = ({ conceptCount, onStart }) => {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Card preview rotation
    const interval = setInterval(() => {
      setPreviewIndex((prev) => (prev + 1) % previewCards.length);
    }, 2000);

    // Ready state animation
    setTimeout(() => setIsReady(true), 500);

    return () => clearInterval(interval);
  }, []);

  const estimatedTime = Math.ceil(conceptCount * 0.5); // 30 seconds per concept

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-400/20 rounded-2xl rotate-12 animate-float"></div>
        <div className="absolute top-40 right-16 w-12 h-12 bg-green-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-10 h-10 bg-orange-400/20 rounded-xl rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-blue-400/20 rounded-3xl -rotate-12 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-8 safe-area-top safe-area-bottom">
        
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 inline-flex animate-pulse-glow">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4 font-display">
            Ready to{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Grasp
            </span>
          </h1>
          
          <p className="text-xl text-white/80 mb-2">
            {conceptCount} concepts ready to master
          </p>
          
          <p className="text-lg text-white/60">
            Bite-sized brilliance awaits
          </p>
        </div>

        {/* Card Preview Stack */}
        <div className={`relative mb-12 transition-all duration-1000 delay-300 ${isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Background cards */}
          <div className="absolute inset-0 transform rotate-2 scale-95">
            <div className="w-80 h-96 bg-white/10 rounded-3xl backdrop-blur-sm"></div>
          </div>
          <div className="absolute inset-0 transform -rotate-1 scale-97">
            <div className="w-80 h-96 bg-white/15 rounded-3xl backdrop-blur-sm"></div>
          </div>
          
          {/* Main preview card */}
          <div className="relative w-80 h-96 bg-white rounded-3xl shadow-2xl p-6 animate-float">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Target className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-600 capitalize">
                  {previewCards[previewIndex].type}
                </span>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {previewCards[previewIndex].difficulty}
              </span>
            </div>

            {/* Visual placeholder */}
            <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-lg"></div>
                <div className="w-6 h-6 bg-purple-500 rounded-lg"></div>
                <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
                {previewCards[previewIndex].title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {previewCards[previewIndex].preview}
              </p>
            </div>

            {/* Swipe hints */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>← Skip</span>
              <span>↑ Save</span>
              <span>Love →</span>
            </div>
          </div>

          {/* Swipe gesture indicators */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <div className="w-8 h-1 bg-white/40 rounded-full animate-pulse"></div>
              <span>Swipe to interact</span>
              <div className="w-8 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>

        {/* Session Info */}
        <div className={`w-full max-w-sm mx-auto mb-8 transition-all duration-1000 delay-500 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-yellow-300" />
                  </div>
                </div>
                <div className="text-lg font-bold text-white font-display">{conceptCount}</div>
                <div className="text-xs text-white/70">Concepts</div>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-10 h-10 bg-green-400/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-300" />
                  </div>
                </div>
                <div className="text-lg font-bold text-white font-display">~{estimatedTime}m</div>
                <div className="text-xs text-white/70">Duration</div>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-10 h-10 bg-blue-400/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-300" />
                  </div>
                </div>
                <div className="text-lg font-bold text-white font-display">Day 1</div>
                <div className="text-xs text-white/70">Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className={`w-full max-w-sm mx-auto transition-all duration-1000 delay-700 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={onStart}
            className="btn-secondary w-full flex items-center justify-center gap-3 text-lg font-bold py-4 animate-pulse-glow"
          >
            <span className="text-2xl">🚀</span>
            Start Your Daily Grasp
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <p className="text-center text-white/60 text-sm mt-4">
            Swipe through concepts at your own pace
          </p>
        </div>

        {/* Bottom Message */}
        <div className={`text-center mt-8 transition-all duration-1000 delay-900 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/50 text-sm italic">
            "Grasp more than just facts — unlock deep understanding"
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaunchReadyScreen;