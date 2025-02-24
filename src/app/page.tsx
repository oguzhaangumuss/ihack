'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const secondCursorRef = useRef<HTMLDivElement>(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  // Mouse takibi için
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isCursorVisible) setIsCursorVisible(true);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [isCursorVisible]);

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
      {/* Ana Cursor Işıltısı */}
      {isCursorVisible && (
        <>
          <div
            ref={cursorRef}
            className="fixed w-[80px] h-[80px] pointer-events-none z-50"
            style={{
              background: 'radial-gradient(circle, rgba(91, 226, 179, 0.8) 0%, rgba(91, 226, 179, 0.4) 40%, transparent 70%)',
              transform: `translate(${mousePosition.x - 40}px, ${mousePosition.y - 40}px)`,
              transition: 'transform 0.4s ease-out',
              filter: 'blur(8px) brightness(1.5)',
              mixBlendMode: 'screen',
            }}
          />

          {/* İkinci parlama katmanı */}
          <div
            ref={secondCursorRef}
            className="fixed w-[40px] h-[40px] pointer-events-none z-50"
            style={{
              background: 'radial-gradient(circle, rgba(91, 226, 179, 1) 0%, transparent 70%)',
              transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
              transition: 'transform 0.4s ease-out',
              filter: 'blur(2px)',
              mixBlendMode: 'screen',
            }}
          />
        </>
      )}

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
        {isSoundPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#5be2b3]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12L20 8v8l4-4zM13.5 4.5L8 10H4v4h4l5.5 5.5v-15z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#5be2b3]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        )}
      </button>

      {/* Background Audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/sound/bg-sound.mp3" type="audio/mp3" />
      </audio>
    </main>
  );
}