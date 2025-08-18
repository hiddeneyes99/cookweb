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
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 max-w-[120px]" data-testid="like-button-container">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full"
      >
        <Button
          onClick={handleLike}
          className={`
            w-full min-w-[80px] bg-black/50 backdrop-blur-lg border 
            ${isLiked 
              ? 'border-red-500/80 bg-red-500/20 text-red-400 shadow-lg shadow-red-500/30' 
              : 'border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50'
            }
            rounded-full px-3 py-2 transition-all duration-300 
            text-xs sm:text-sm font-medium
            hover:shadow-xl active:scale-95
          `}
          data-testid="like-btn"
        >
          <div className="flex items-center justify-center space-x-1.5">
            <motion.i 
              className={`fas fa-heart text-base ${isLiked ? 'text-red-400' : 'text-white/90'}`}
              animate={isLiked ? { 
                scale: [1, 1.4, 1], 
                rotate: [0, 15, -15, 0] 
              } : {}}
              transition={{ 
                duration: 0.6, 
                ease: "easeInOut",
                times: [0, 0.3, 1]
              }}
            ></motion.i>
            <span className="font-bold min-w-[20px] text-center">
              {likes > 0 ? likes.toLocaleString() : '0'}
            </span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
}