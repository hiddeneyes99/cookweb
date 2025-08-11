import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MatrixRain from './MatrixRain';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    'Initializing framework...',
    'Loading phishing modules...',
    'Setting up 2FA bypass...',
    'Configuring IP logging...',
    'Preparing tunneling protocols...',
    'Framework ready!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 20 + 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return 100;
        }
        
        // Update message based on progress
        const newMessageIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1));
        if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
          setMessageIndex(newMessageIndex);
        }
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete, messageIndex, loadingMessages.length]);

  return (
    <div className="loading-overlay" data-testid="loading-screen">
      <MatrixRain />
      <div className="text-center z-10 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl font-orbitron font-bold text-matrix mb-8 animate-glow-pulse"
          data-testid="loading-title"
        >
          COOKPHISH
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl font-mono mb-8"
          data-testid="loading-subtitle"
        >
          Initializing Hacking Framework...
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4"
        >
          <div 
            className="h-full bg-gradient-to-r from-matrix to-cyber-blue transition-all duration-300"
            style={{ width: `${progress}%` }}
            data-testid="progress-bar"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mt-4 font-mono text-sm text-matrix"
          data-testid="loading-message"
        >
          {loadingMessages[messageIndex]}
        </motion.div>
      </div>
    </div>
  );
}
