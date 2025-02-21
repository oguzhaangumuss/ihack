'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Video ve ses kontrolü
    if (videoRef.current) {
      videoRef.current.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
      });
    }

    // Ses ayarları
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      // Ses yüklendiğinde
      audioRef.current.load(); // Sesi önceden yükle
      audioRef.current.addEventListener('loadeddata', () => {
        setIsAudioLoaded(true);
        console.log('Audio loaded successfully');
      });
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio load error:', e);
      });
    }

    // Video bittiğinde
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        if (videoRef.current) {
          videoRef.current.currentTime = 0; // Videoyu başa sar
        }
      });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      // Event listener cleanup
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', () => {});
      }
    };
  }, []);

  const playAudio = async () => {
    if (audioRef.current) {
      try {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsSoundPlaying(true);
          console.log('Audio playing');
        }
      } catch (error) {
        console.error('Audio play error:', error);
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsSoundPlaying(false);
    }
  };

  const handlePlayClick = async () => {
    if (videoRef.current) {
      try {
        if (!isPlaying) {
          await videoRef.current.play();
          setIsPlaying(true);
          if (!isSoundPlaying) {
            await playAudio();
          }
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      } catch (error) {
        console.error('Video play error:', error);
      }
    }
  };

  const toggleSound = async () => {
    console.log('Toggle sound clicked', { isSoundPlaying, isAudioLoaded });
    if (audioRef.current) {
      if (isSoundPlaying) {
        pauseAudio();
      } else {
        await playAudio();
      }
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/sound/bg-sound.mp3" type="audio/mp3" />
      </audio>

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="object-cover w-full h-full opacity-100"
          playsInline
          preload="auto"
        >
          <source src="/video/bg-video2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-800/50 
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

      {/* Invisible Button Container */}
      <div className={`absolute top-[30%] right-[25%] z-10 transform -translate-y-1/2 -translate-x-1/2
                    sm:top-[35%] sm:right-[20%] 
                    md:top-[40%] md:right-[25%] 
                    lg:top-[35%] lg:right-[30%]
                    xl:top-[45%] xl:right-[19%]
                    ${isMobile ? 'scale-75' : ''}`}>
        <button
          onClick={handlePlayClick}
          className="w-32 h-32 rounded-full cursor-pointer relative group"
        >
          {/* Hover/Touch Glow Effect */}
          <div className={`absolute inset-0 ${isMobile ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'} 
                        transition-all duration-500
                        bg-gradient-radial from-[#5be2b3]/30 via-transparent to-transparent
                        blur-xl rounded-full scale-150`} />
          
          {/* Inner Glow */}
          <div className={`absolute inset-0 ${isMobile ? 'opacity-30' : 'opacity-0 group-hover:opacity-70'} 
                        transition-all duration-500
                        bg-[#5be2b3]/10 rounded-full
                        group-hover:shadow-[0_0_30px_15px_rgba(91,226,179,0.2)]`} />
        </button>
      </div>
    </main>
  );
}
