import React, { useState, useEffect } from 'react';
import { Brain, FileText, Sparkles, Zap } from 'lucide-react';

interface ProcessingScreenProps {
  fileName: string;
  onComplete: () => void;
}

const steps = [
  { icon: FileText, text: "Analyzing document structure...", duration: 1000 },
  { icon: Brain, text: "Extracting key concepts...", duration: 1500 },
  { icon: Sparkles, text: "Creating micro-lessons...", duration: 1200 },
  { icon: Zap, text: "Optimizing for learning...", duration: 800 }
];

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ fileName, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [floatingPages, setFloatingPages] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating pages
    const pages = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setFloatingPages(pages);

    // Progress simulation
    let totalTime = 0;
    const stepDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, totalTime);
      
      totalTime += step.duration;
    });

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + (100 / (stepDuration / 50));
      });
    }, 50);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const CurrentStepIcon = steps[currentStep]?.icon || Brain;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingPages.map((page) => (
          <div
            key={page.id}
            className="absolute w-8 h-10 bg-white/20 rounded-lg animate-float opacity-30"
            style={{
              left: `${page.x}%`,
              top: `${page.y}%`,
              animationDelay: `${page.delay}s`,
              transform: `rotate(${Math.random() * 30 - 15}deg)`
            }}
          >
            <div className="w-full h-1 bg-white/40 rounded mt-2 mx-1"></div>
            <div className="w-3/4 h-1 bg-white/40 rounded mt-1 mx-1"></div>
            <div className="w-1/2 h-1 bg-white/40 rounded mt-1 mx-1"></div>
          </div>
        ))}
        
        {/* Neural network visualization */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Nodes */}
            <circle cx="50" cy="50" r="4" fill="white" className="animate-pulse" />
            <circle cx="150" cy="50" r="4" fill="white" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="50" cy="150" r="4" fill="white" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="150" cy="150" r="4" fill="white" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="100" cy="100" r="6" fill="white" className="animate-pulse" style={{ animationDelay: '0.25s' }} />
            
            {/* Connections */}
            <line x1="50" y1="50" x2="100" y2="100" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="150" y1="50" x2="100" y2="100" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="50" y1="150" x2="100" y2="100" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="150" y1="150" x2="100" y2="100" stroke="white" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-8 safe-area-top safe-area-bottom">
        
        {/* Central Processing Animation */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            {/* Pulsing brain icon */}
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 inline-flex animate-pulse-glow">
              <CurrentStepIcon className="w-16 h-16 text-white" />
            </div>
            
            {/* Orbiting particles */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4 font-display">
            Transforming Your PDF
          </h1>
          
          <p className="text-lg text-white/80 mb-2">
            {steps[currentStep]?.text || "Processing..."}
          </p>
          
          <p className="text-sm text-white/60">
            Creating bite-sized brilliance from "{fileName}"
          </p>
        </div>

        {/* Progress Ring */}
        <div className="relative mb-8">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
              className="transition-all duration-300 ease-out"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Progress percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white font-display">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Processing Steps */}
        <div className="w-full max-w-sm mx-auto">
          <div className="space-y-3">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div
                  key={index}
                  className={`
                    flex items-center gap-3 p-3 rounded-2xl transition-all duration-300
                    ${isActive ? 'bg-white/20 backdrop-blur-sm border border-white/30' : 
                      isCompleted ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 
                      'bg-white/5 backdrop-blur-sm border border-white/10'}
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                    ${isActive ? 'bg-yellow-400 text-gray-900' : 
                      isCompleted ? 'bg-green-400 text-white' : 
                      'bg-white/20 text-white/60'}
                  `}>
                    {isCompleted ? (
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  
                  <span className={`
                    font-medium transition-all duration-300
                    ${isActive ? 'text-white' : 
                      isCompleted ? 'text-white/80' : 
                      'text-white/50'}
                  `}>
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">
            This usually takes 30-60 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;