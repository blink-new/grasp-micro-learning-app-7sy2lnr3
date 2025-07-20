import React, { useState } from 'react';
import { Upload, Brain, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onFileUpload: (file: File) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-2xl rotate-12 animate-float opacity-20"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-green-400 rounded-full animate-float opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-orange-400 rounded-xl rotate-45 animate-float opacity-25" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-400 rounded-3xl -rotate-12 animate-float opacity-20" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-10 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-8 safe-area-top safe-area-bottom">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 animate-bounce-in">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Grasp
            </span>
          </h1>
          
          <p className="text-xl text-white/80 mb-2 font-medium">
            Transform PDFs into bite-sized brilliance
          </p>
          
          <p className="text-lg text-white/60 max-w-md mx-auto">
            AI-powered micro-learning that makes complex topics addictively simple
          </p>
        </div>

        {/* Upload Card */}
        <div className="w-full max-w-sm mx-auto mb-8">
          <div 
            className={`
              bg-white rounded-3xl p-8 shadow-2xl transition-all duration-300 transform
              ${isDragging ? 'scale-105 shadow-3xl bg-purple-50' : 'hover:scale-102'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div className="mb-6">
                <div className={`
                  inline-flex items-center justify-center w-20 h-20 rounded-2xl transition-all duration-300
                  ${isDragging ? 'bg-purple-100 scale-110' : 'bg-purple-50'}
                `}>
                  <Upload className={`w-10 h-10 ${isDragging ? 'text-purple-600' : 'text-purple-500'}`} />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">
                Upload Your PDF
              </h3>
              
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Drop your document here or tap to browse. We'll transform it into engaging micro-lessons.
              </p>
              
              <label className="block">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="btn-primary w-full cursor-pointer inline-flex items-center justify-center gap-2 text-center">
                  <Sparkles className="w-5 h-5" />
                  Choose PDF File
                  <ArrowRight className="w-5 h-5" />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                <span className="text-lg">🧠</span>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">AI-Powered</h4>
                <p className="text-white/70 text-xs">Smart content extraction</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-400 rounded-xl flex items-center justify-center">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Micro-Learning</h4>
                <p className="text-white/70 text-xs">Bite-sized knowledge chunks</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-400 rounded-xl flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Gamified</h4>
                <p className="text-white/70 text-xs">Addictive learning experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">
            Join thousands learning smarter, not harder
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;