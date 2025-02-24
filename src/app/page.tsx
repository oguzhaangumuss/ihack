'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  // Audio yükleme kontrolü
  useEffect(() => {
    const audio = audioRef.current;
    const handleLoad = () => setIsAudioLoaded(true);
    
    if (audio) {
      audio.addEventListener('loadeddata', handleLoad);
      audio.addEventListener('error', handleLoad);
      audio.preload = 'auto';
      audio.load();
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadeddata', handleLoad);
      }
    };
  }, []);

  const toggleSound = async () => {
    if (audioRef.current) {
      if (isSoundPlaying) {
        audioRef.current.pause();
        setIsSoundPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsSoundPlaying(true);
        } catch (error) {
          console.error('Audio play error:', error);
        }
      }
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Sis Efekti Container */}
      <div className="fog-container absolute inset-0 z-20">
        <div className="fog-img fog-img-first" />
        <div className="fog-img fog-img-second" />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/images/bg2.jpeg"
          alt="Background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Loading Screen */}
      <div 
        className={`absolute inset-0 z-50 flex items-center justify-center bg-black
          transition-opacity duration-1000 
          ${isAudioLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full" />
      </div>

      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-zinc-800/50 
                 hover:bg-zinc-700/50 transition-all duration-300"
      >
        {/* SVG Icons same as before */}
      </button>

      {/* Background Audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/sound/bg-sound.mp3" type="audio/mp3" />
      </audio>
    </main>
  );
}