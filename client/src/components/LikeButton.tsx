import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Load likes from localStorage
    const savedLikes = localStorage.getItem('cookphish-likes');
    const userLiked = localStorage.getItem('cookphish-user-liked');
    
    if (savedLikes) {
      setLikes(parseInt(savedLikes));
    } else {
      // Initialize with 0 likes (fresh start)
      setLikes(0);
    }
    
    setIsLiked(userLiked === 'true');
  }, []);

  const handleLike = () => {
    if (!isLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setIsLiked(true);
      localStorage.setItem('cookphish-likes', newLikes.toString());
      localStorage.setItem('cookphish-user-liked', 'true');
    } else {
      const newLikes = Math.max(0, likes - 1);
      setLikes(newLikes);
      setIsLiked(false);
      localStorage.setItem('cookphish-likes', newLikes.toString());
      localStorage.setItem('cookphish-user-liked', 'false');
    }
  };

  return (
    <div 
      className="fixed bottom-4 right-4 z-[9999] pointer-events-auto" 
      data-testid="like-button-container"
      style={{ 
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 9999
      }}
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <Button
          onClick={handleLike}
          className={`
            flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16
            ${isLiked 
              ? 'bg-gradient-to-r from-red-500/90 to-pink-500/90 border-red-400/60 text-white shadow-2xl shadow-red-500/50' 
              : 'bg-gradient-to-r from-gray-800/90 to-gray-700/90 border-white/30 text-white/90 shadow-2xl shadow-black/50'
            }
            backdrop-blur-xl border-2 rounded-full transition-all duration-300 
            hover:shadow-3xl hover:scale-105 active:scale-95
            font-bold text-xs sm:text-sm
          `}
          data-testid="like-btn"
        >
          <div className="flex flex-col items-center justify-center space-y-0.5">
            <motion.i 
              className={`fas fa-heart text-lg sm:text-xl ${isLiked ? 'text-white' : 'text-white/90'}`}
              animate={isLiked ? { 
                scale: [1, 1.3, 1], 
                rotate: [0, 10, -10, 0] 
              } : {}}
              transition={{ 
                duration: 0.5, 
                ease: "easeOut"
              }}
            ></motion.i>
            <span className="text-xs font-black leading-none">
              {likes > 0 ? (likes > 999 ? `${Math.floor(likes/1000)}k` : likes) : '0'}
            </span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
}