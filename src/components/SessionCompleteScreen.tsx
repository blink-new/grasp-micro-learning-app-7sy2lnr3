import React, { useEffect, useState } from 'react';
import { Trophy, Heart, BookmarkPlus, Clock, Target, Share2, RotateCcw } from 'lucide-react';

interface SessionCompleteScreenProps {
  stats: {
    loved: number;
    skipped: number;
    saved: number;
    timeSpent: number;
  };
  onRestart: () => void;
  onNewSession: () => void;
}

const SessionCompleteScreen: React.FC<SessionCompleteScreenProps> = ({ 
  stats, 
  onRestart, 
  onNewSession 
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    loved: 0,
    saved: 0,
    timeSpent: 0
  });

  const totalCards = stats.loved + stats.skipped + stats.saved;
  const completionRate = Math.round((stats.loved / totalCards) * 100);
  const efficiency = Math.round((totalCards / stats.timeSpent) * 60); // cards per minute

  useEffect(() => {
    setShowConfetti(true);
    
    // Animate stats counting up
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        loved: Math.round(stats.loved * progress),
        saved: Math.round(stats.saved * progress),
        timeSpent: Math.round(stats.timeSpent * progress)
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats({
          loved: stats.loved,
          saved: stats.saved,
          timeSpent: stats.timeSpent
        });
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [stats]);

  const getPerformanceMessage = () => {
    if (completionRate >= 80) return "🔥 Outstanding! You're a learning machine!";
    if (completionRate >= 60) return "🎯 Great job! You're building solid knowledge!";
    if (completionRate >= 40) return "💪 Good progress! Keep up the momentum!";
    return "🌱 Every step counts! You're growing!";
  };

  const getPerformanceColor = () => {
    if (completionRate >= 80) return "from-green-400 to-emerald-500";
    if (completionRate >= 60) return "from-blue-400 to-cyan-500";
    if (completionRate >= 40) return "from-yellow-400 to-orange-500";
    return "from-purple-400 to-pink-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#fbbf24', '#f97316', '#22c55e', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0'
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-8 safe-area-top safe-area-bottom">
        
        {/* Trophy Section */}
        <div className="text-center mb-8">
          <div className="mb-6 animate-bounce-in">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 inline-flex">
              <Trophy className="w-16 h-16 text-yellow-300" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4 font-display">
            Session Complete!
          </h1>
          
          <p className="text-xl text-white/80 mb-2">
            {getPerformanceMessage()}
          </p>
          
          <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getPerformanceColor()} text-white font-semibold text-lg`}>
            {completionRate}% Mastery Rate
          </div>
        </div>

        {/* Stats Cards */}
        <div className="w-full max-w-sm mx-auto mb-8 space-y-4">
          {/* Main Stats */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 font-display">
                  {animatedStats.loved}
                </div>
                <div className="text-sm text-gray-600">Grasped</div>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                    <BookmarkPlus className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 font-display">
                  {animatedStats.saved}
                </div>
                <div className="text-sm text-gray-600">Saved</div>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 font-display">
                  {Math.floor(animatedStats.timeSpent / 60)}:{(animatedStats.timeSpent % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Learning Insights</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/80">
                <span>Learning Speed:</span>
                <span className="font-medium">{efficiency} concepts/min</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Focus Score:</span>
                <span className="font-medium">{Math.round((stats.loved / totalCards) * 100)}%</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Knowledge Retention:</span>
                <span className="font-medium">
                  {stats.saved > 0 ? 'High' : stats.loved > stats.skipped ? 'Good' : 'Building'}
                </span>
              </div>
            </div>
          </div>

          {/* Streak & Achievements */}
          <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🔥</span>
              <div>
                <div className="font-bold text-lg">Daily Streak</div>
                <div className="text-sm opacity-90">Keep the momentum going!</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">Day 1</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm mx-auto space-y-3">
          <button
            onClick={onNewSession}
            className="btn-secondary w-full"
          >
            <span className="text-lg">🚀</span>
            Start New Session
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl py-3 px-4 hover:bg-white/20 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="font-medium">Review</span>
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Grasp Learning Progress',
                    text: `Just completed a learning session! Grasped ${stats.loved} concepts in ${Math.floor(stats.timeSpent / 60)} minutes with ${completionRate}% mastery rate! 🧠✨`,
                  });
                }
              }}
              className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl py-3 px-4 hover:bg-white/20 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Share</span>
            </button>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm italic max-w-xs mx-auto">
            "Learning is not about memorizing facts, it's about building understanding that lasts."
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionCompleteScreen;