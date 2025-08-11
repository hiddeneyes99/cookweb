import { useCallback, useRef } from 'react';
import { AudioManager } from '@/utils/audioManager';

export function useSoundEffects() {
  const audioManagerRef = useRef<AudioManager | null>(null);

  // Initialize audio manager on first use
  const getAudioManager = useCallback(() => {
    if (!audioManagerRef.current) {
      audioManagerRef.current = new AudioManager();
    }
    return audioManagerRef.current;
  }, []);

  const playClick = useCallback(() => {
    try {
      getAudioManager().playClickSound();
    } catch (error) {
      console.warn('Failed to play click sound:', error);
    }
  }, [getAudioManager]);

  const playHover = useCallback(() => {
    try {
      getAudioManager().playHoverSound();
    } catch (error) {
      console.warn('Failed to play hover sound:', error);
    }
  }, [getAudioManager]);

  const playNotification = useCallback(() => {
    try {
      getAudioManager().playNotificationSound();
    } catch (error) {
      console.warn('Failed to play notification sound:', error);
    }
  }, [getAudioManager]);

  return {
    playClick,
    playHover,
    playNotification
  };
}
