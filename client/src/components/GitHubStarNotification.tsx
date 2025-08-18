import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function GitHubStarNotification() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show notification after 30 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowNotification(false);
  };

  const handleStar = () => {
    window.open('https://github.com/technicalwhitehat-yt/CookPhish', '_blank');
    setShowNotification(false);
  };

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600/90 to-purple-700/90 backdrop-blur-md border border-purple-400/50 rounded-2xl p-6 shadow-2xl shadow-purple-500/30 max-w-sm"
          data-testid="github-star-notification"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                <i className="fas fa-star text-yellow-400 text-xl"></i>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2">Enjoying CookPhish?</h3>
              <p className="text-white/80 text-sm mb-4">
                Give us a ⭐ on GitHub and follow on social media for updates!
              </p>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleStar}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  data-testid="star-github-btn"
                >
                  <i className="fab fa-github mr-2"></i>
                  Star on GitHub
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleClose}
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  data-testid="dismiss-notification-btn"
                >
                  Later
                </Button>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white transition-colors"
              data-testid="close-notification-btn"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}