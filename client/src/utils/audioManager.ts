export class AudioManager {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeAudioContext();
  }

  private async initializeAudioContext() {
    try {
      // Check if AudioContext is supported
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn('Web Audio API not supported');
        return;
      }

      this.audioContext = new AudioContextClass();
      
      // Resume audio context if it's suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.isInitialized = true;
    } catch (error) {
      console.warn('Failed to initialize audio context:', error);
    }
  }

  private createBeep(frequency: number, duration: number, type: OscillatorType = 'sine'): Promise<void> {
    return new Promise((resolve) => {
      if (!this.audioContext || !this.isInitialized) {
        resolve();
        return;
      }

      try {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);

        oscillator.onended = () => resolve();
      } catch (error) {
        console.warn('Failed to create beep:', error);
        resolve();
      }
    });
  }

  async playClickSound(): Promise<void> {
    try {
      // Ensure audio context is ready
      if (this.audioContext && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      // Create a cyber-style click sound (higher frequency, short duration)
      await this.createBeep(800, 0.1, 'square');
    } catch (error) {
      console.warn('Failed to play click sound:', error);
    }
  }

  async playHoverSound(): Promise<void> {
    try {
      // Ensure audio context is ready
      if (this.audioContext && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      // Create a subtle hover sound (medium frequency, very short duration)
      await this.createBeep(600, 0.05, 'sine');
    } catch (error) {
      console.warn('Failed to play hover sound:', error);
    }
  }

  async playNotificationSound(): Promise<void> {
    try {
      // Ensure audio context is ready
      if (this.audioContext && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      // Create a notification sound (ascending tones)
      await this.createBeep(500, 0.15, 'sine');
      setTimeout(async () => {
        await this.createBeep(700, 0.15, 'sine');
      }, 100);
    } catch (error) {
      console.warn('Failed to play notification sound:', error);
    }
  }

  destroy() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.isInitialized = false;
    }
  }
}
