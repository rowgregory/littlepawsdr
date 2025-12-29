import { useEffect, useRef } from 'react';

const useSoundEffect = (soundFilePath: string, playSound: boolean, loop?: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (soundFilePath && !audioRef.current) {
      const audio = new Audio(soundFilePath);
      audio.loop = loop || false;

      audioRef.current = audio;
    }
  }, [soundFilePath, loop]);

  const play = () => {
    if (playSound && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1;
      audioRef.current.play();
    }
  };

  const stop = async () => {
    if (audioRef.current) {
      const startVolume = audioRef.current.volume;
      const duration = 1000;
      const steps = 20;
      const stepDuration = duration / steps;

      for (let i = 1; i <= steps; i++) {
        await new Promise((resolve) => setTimeout(resolve, stepDuration));
        if (audioRef.current) {
          audioRef.current.volume = startVolume * (1 - i / steps);
        }
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1;
      }
    }
  };
  return { play, stop };
};

export default useSoundEffect;
