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
      // Initialize with a base count
      setLikes(1247);
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
    <div className="fixed bottom-6 left-6 z-40" data-testid="like-button-container">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleLike}
          className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 transition-all duration-300 hover:bg-white/20 ${
            isLiked ? 'text-red-400 border-red-400/50' : 'text-white'
          }`}
          data-testid="like-btn"
        >
          <div className="flex items-center space-x-2">
            <motion.i 
              className={`fas fa-heart ${isLiked ? 'text-red-400' : 'text-white/80'}`}
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            ></motion.i>
            <span className="text-sm font-semibold">{likes.toLocaleString()}</span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
}