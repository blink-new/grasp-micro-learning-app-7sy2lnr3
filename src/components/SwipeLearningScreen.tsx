import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Heart, X, BookmarkPlus, TrendingUp, Zap, Target } from 'lucide-react';

interface Card {
  id: number;
  type: 'concept' | 'diagram' | 'analogy' | 'example';
  title: string;
  content: string;
  tags: string[];
  visual?: 'chart' | 'diagram' | 'graph' | 'illustration';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface SwipeLearningScreenProps {
  onBack: () => void;
  onComplete: (stats: { loved: number; skipped: number; saved: number; timeSpent: number }) => void;
}

const SwipeLearningScreen: React.FC<SwipeLearningScreenProps> = ({ onBack, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards] = useState<Card[]>([
    {
      id: 1,
      type: 'concept',
      title: 'Neural Networks',
      content: 'Think of neural networks like your brain\'s neurons. Each connection gets stronger when it helps make correct decisions, just like learning to ride a bike.',
      tags: ['ai', 'analogy', 'beginner'],
      visual: 'diagram',
      difficulty: 'beginner'
    },
    {
      id: 2,
      type: 'diagram',
      title: 'Machine Learning Process',
      content: 'Machine learning follows a simple cycle: collect data, train the model, make predictions, and improve based on results.',
      tags: ['ml', 'process', 'intermediate'],
      visual: 'chart',
      difficulty: 'intermediate'
    },
    {
      id: 3,
      type: 'analogy',
      title: 'Deep Learning Layers',
      content: 'Deep learning is like looking at a photo through multiple filters. Each layer recognizes different features - first edges, then shapes, then objects.',
      tags: ['deep-learning', 'layers', 'beginner'],
      visual: 'illustration',
      difficulty: 'beginner'
    },
    {
      id: 4,
      type: 'example',
      title: 'Gradient Descent',
      content: 'Imagine you\'re hiking down a mountain in fog. Gradient descent is like feeling the slope with your feet to find the steepest path down.',
      tags: ['optimization', 'algorithm', 'intermediate'],
      visual: 'graph',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      type: 'concept',
      title: 'Overfitting',
      content: 'Overfitting is like memorizing answers instead of understanding concepts. The model performs great on practice tests but fails on new questions.',
      tags: ['overfitting', 'generalization', 'intermediate'],
      visual: 'chart',
      difficulty: 'intermediate'
    }
  ]);

  const [dragState, setDragState] = useState({ x: 0, y: 0, rotation: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [stats, setStats] = useState({ loved: 0, skipped: 0, saved: 0, timeSpent: 0 });
  const [savedNotes, setSavedNotes] = useState<Card[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const startTime = useRef(Date.now());

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (!currentCard) return;

    const newStats = { ...stats };
    let feedbackText = '';

    switch (direction) {
      case 'right':
        newStats.loved++;
        feedbackText = '❤️ Concept Grasped!';
        break;
      case 'left':
        newStats.skipped++;
        feedbackText = '⏭️ Skipped for later';
        break;
      case 'up':
        newStats.saved++;
        setSavedNotes(prev => [...prev, currentCard]);
        feedbackText = '📚 Saved as Note!';
        break;
    }

    setStats(newStats);
    setShowFeedback(feedbackText);

    setTimeout(() => {
      setShowFeedback(null);
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
        onComplete({ ...newStats, timeSpent });
      }
    }, 800);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const rotation = deltaX * 0.1;

      setDragState({ x: deltaX, y: deltaY, rotation });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      const { x, y } = dragState;

      if (Math.abs(y) > 100 && y < 0) {
        handleSwipe('up');
      } else if (Math.abs(x) > 100) {
        handleSwipe(x > 0 ? 'right' : 'left');
      }

      setDragState({ x: 0, y: 0, rotation: 0 });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const renderVisual = (visual: string, title: string) => {
    const visualClasses = "w-full h-32 rounded-2xl flex items-center justify-center mb-6";
    
    switch (visual) {
      case 'chart':
        return (
          <div className={`${visualClasses} bg-gradient-to-r from-blue-100 to-purple-100`}>
            <div className="flex items-end gap-2 h-16">
              <div className="w-4 bg-blue-500 h-8 rounded-t"></div>
              <div className="w-4 bg-purple-500 h-12 rounded-t"></div>
              <div className="w-4 bg-green-500 h-6 rounded-t"></div>
              <div className="w-4 bg-yellow-500 h-10 rounded-t"></div>
              <div className="w-4 bg-red-500 h-14 rounded-t"></div>
            </div>
          </div>
        );
      case 'diagram':
        return (
          <div className={`${visualClasses} bg-gradient-to-r from-green-100 to-blue-100`}>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              <div className="flex flex-col gap-1">
                <div className="w-6 h-1 bg-gray-400 rounded"></div>
                <div className="w-6 h-1 bg-gray-400 rounded"></div>
                <div className="w-6 h-1 bg-gray-400 rounded"></div>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              <div className="flex flex-col gap-1">
                <div className="w-6 h-1 bg-gray-400 rounded"></div>
                <div className="w-6 h-1 bg-gray-400 rounded"></div>
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        );
      case 'graph':
        return (
          <div className={`${visualClasses} bg-gradient-to-r from-orange-100 to-red-100`}>
            <div className="relative w-24 h-16">
              <svg viewBox="0 0 100 60" className="w-full h-full">
                <path
                  d="M 10 50 Q 30 20 50 30 T 90 10"
                  stroke="#f97316"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                />
                <circle cx="10" cy="50" r="2" fill="#f97316" />
                <circle cx="50" cy="30" r="2" fill="#f97316" />
                <circle cx="90" cy="10" r="2" fill="#f97316" />
              </svg>
            </div>
          </div>
        );
      case 'illustration':
        return (
          <div className={`${visualClasses} bg-gradient-to-r from-yellow-100 to-orange-100`}>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-lg"></div>
                <div className="w-6 h-6 bg-orange-400 rounded-lg"></div>
                <div className="w-6 h-6 bg-red-400 rounded-lg"></div>
              </div>
              <div className="w-2 h-4 bg-gray-400 rounded"></div>
              <div className="w-12 h-8 bg-purple-400 rounded-lg"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return <Target className="w-4 h-4" />;
      case 'diagram': return <TrendingUp className="w-4 h-4" />;
      case 'analogy': return <Zap className="w-4 h-4" />;
      case 'example': return <Heart className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  if (!currentCard) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Header */}
      <div className="safe-area-top bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-1 mx-4">
            <div className="bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white/70 text-sm text-center mt-1">
              {currentIndex + 1} of {cards.length}
            </p>
          </div>
          
          <div className="text-white/70 text-sm">
            ❤️ {stats.loved} 📚 {stats.saved}
          </div>
        </div>
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Next card preview */}
        {currentIndex < cards.length - 1 && (
          <div className="absolute inset-6 bg-white rounded-3xl opacity-20 scale-95 transform rotate-2" />
        )}
        
        {/* Current card */}
        <div
          ref={cardRef}
          className={`
            swipe-card w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 relative z-10
            ${isDragging ? 'dragging' : ''}
          `}
          style={{
            transform: `translateX(${dragState.x}px) translateY(${dragState.y}px) rotate(${dragState.rotation}deg)`,
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-xl ${getDifficultyColor(currentCard.difficulty)}`}>
                {getTypeIcon(currentCard.type)}
              </div>
              <span className="text-sm font-medium text-gray-600 capitalize">
                {currentCard.type}
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
              {currentCard.difficulty}
            </span>
          </div>

          {/* Visual Element */}
          {currentCard.visual && renderVisual(currentCard.visual, currentCard.title)}

          {/* Content */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">
              {currentCard.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {currentCard.content}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {currentCard.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Swipe Hints */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <X className="w-4 h-4" />
              <span>Skip</span>
            </div>
            <div className="flex items-center gap-1">
              <BookmarkPlus className="w-4 h-4" />
              <span>↑ Save</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>Love</span>
            </div>
          </div>
        </div>

        {/* Swipe Feedback */}
        {showFeedback && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-2xl animate-bounce-in">
              <p className="text-xl font-bold text-gray-900">{showFeedback}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="safe-area-bottom p-6">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleSwipe('left')}
            className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => handleSwipe('up')}
            className="w-14 h-14 bg-yellow-500 hover:bg-yellow-600 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
          >
            <BookmarkPlus className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => handleSwipe('right')}
            className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-center text-white/60 text-sm mt-4">
          Swipe or tap to interact with cards
        </p>
      </div>
    </div>
  );
};

export default SwipeLearningScreen;