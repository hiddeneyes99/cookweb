import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ModernLoadingScreenProps {
  onComplete: () => void;
}

export default function ModernLoadingScreen({ onComplete }: ModernLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    'Initializing CookPhish...',
    'Loading security modules...',
    'Setting up phishing framework...',
    'Configuring 2FA bypass...',
    'Preparing IP logging system...',
    'Framework ready!'
  ];

  useEffect(() => {
    // Faster loading for better mobile experience
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 25 + 15; // Faster progress
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 300); // Reduced delay
          return 100;
        }
        
        // Update message based on progress
        const newMessageIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1));
        if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
          setMessageIndex(newMessageIndex);
        }
        
        return newProgress;
      });
    }, 100); // Faster updates

    return () => clearInterval(interval);
  }, [onComplete, messageIndex, loadingMessages.length]);

  return (
    <div className="loading-overlay" data-testid="loading-screen">
      <div className="text-center z-10 relative text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="text-7xl font-bold mb-6 text-white drop-shadow-2xl" data-testid="loading-title">
            CookPhish
          </div>
          <div className="text-2xl font-light text-white/90 mb-8" data-testid="loading-subtitle">
            Advanced Phishing Simulation Framework
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-80 mx-auto"
        >
          <div className="relative">
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
              <motion.div 
                className="h-full bg-gradient-to-r from-white to-purple-200 transition-all duration-300"
                style={{ width: `${progress}%` }}
                data-testid="progress-bar"
              />
            </div>
            <div className="text-right mt-2">
              <span className="text-white/80 font-mono text-sm">{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-8 text-white/90 font-medium"
          data-testid="loading-message"
        >
          {loadingMessages[messageIndex]}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 text-white/70 text-sm"
        >
          Created by <span className="font-semibold text-white">Technical White Hat</span> from India
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [-10, -50, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}