import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import ProcessingScreen from './components/ProcessingScreen'
import LaunchReadyScreen from './components/LaunchReadyScreen'
import SwipeLearningScreen from './components/SwipeLearningScreen'
import SessionCompleteScreen from './components/SessionCompleteScreen'

export type AppState = 'welcome' | 'processing' | 'ready' | 'learning' | 'complete'

export interface LearningCard {
  id: string
  type: string
  title: string
  content: string
  tags: string[]
  icon: string
}

function App() {
  const [currentState, setCurrentState] = useState<AppState>('welcome')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [learningCards, setLearningCards] = useState<LearningCard[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [graspedConcepts, setGraspedConcepts] = useState(0)
  const [streak, setStreak] = useState(0)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setCurrentState('processing')
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock learning cards
      const mockCards: LearningCard[] = [
        {
          id: '1',
          type: 'Concept',
          title: 'Neural Networks',
          content: 'Think of neural networks like your brain\'s neurons. Each connection gets stronger when it helps make correct decisions, just like learning to ride a bike.',
          tags: ['#ai', '#analogy', '#beginner'],
          icon: '🧠'
        },
        {
          id: '2',
          type: 'Definition',
          title: 'Machine Learning',
          content: 'Machine learning is like teaching a computer to recognize patterns by showing it thousands of examples, similar to how you learned to recognize faces.',
          tags: ['#ml', '#pattern', '#learning'],
          icon: '🤖'
        },
        {
          id: '3',
          type: 'Analogy',
          title: 'Deep Learning',
          content: 'Deep learning is like having multiple layers of pattern recognition, each layer finding more complex patterns than the last.',
          tags: ['#deep', '#layers', '#complex'],
          icon: '🔍'
        }
      ]
      
      setLearningCards(mockCards)
      setCurrentState('ready')
    }, 3000)
  }

  const handleStartLearning = () => {
    setCurrentState('learning')
  }

  const handleCardSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setGraspedConcepts(prev => prev + 1)
    }
    
    if (currentCardIndex < learningCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
    } else {
      // Session complete
      setStreak(prev => prev + 1)
      setCurrentState('complete')
    }
  }

  const handleNewSession = () => {
    setCurrentState('welcome')
    setCurrentCardIndex(0)
    setGraspedConcepts(0)
    setUploadedFile(null)
    setLearningCards([])
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {currentState === 'welcome' && (
        <WelcomeScreen onFileUpload={handleFileUpload} />
      )}
      
      {currentState === 'processing' && (
        <ProcessingScreen fileName={uploadedFile?.name || ''} />
      )}
      
      {currentState === 'ready' && (
        <LaunchReadyScreen 
          cardCount={learningCards.length}
          onStartLearning={handleStartLearning}
          streak={streak}
        />
      )}
      
      {currentState === 'learning' && (
        <SwipeLearningScreen
          cards={learningCards}
          currentIndex={currentCardIndex}
          onSwipe={handleCardSwipe}
          graspedCount={graspedConcepts}
        />
      )}
      
      {currentState === 'complete' && (
        <SessionCompleteScreen
          graspedCount={graspedConcepts}
          totalCards={learningCards.length}
          streak={streak}
          onNewSession={handleNewSession}
        />
      )}
    </div>
  )
}

export default App