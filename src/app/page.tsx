'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
      });
    }
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="object-cover w-full h-full opacity-100"
          loop
          playsInline
        >
          <source src="/video/bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Invisible Button Container */}
      <div className="absolute top-[30%] right-[25%] z-10 transform -translate-y-1/2 -translate-x-1/2
                    sm:top-[35%] sm:right-[20%] 
                    md:top-[40%] md:right-[25%] 
                    lg:top-[35%] lg:right-[30%]
                    xl:top-[45%] xl:right-[19%]">
        <button
          onClick={handlePlayClick}
          className="w-32 h-32 rounded-full cursor-pointer relative group"
        >
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500
                        bg-gradient-radial from-[#5be2b3]/30 via-transparent to-transparent
                        blur-xl rounded-full scale-150" />
          
          {/* Inner Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-all duration-500
                        bg-[#5be2b3]/10 rounded-full
                        group-hover:shadow-[0_0_30px_15px_rgba(91,226,179,0.2)]" />
        </button>
      </div>
    </main>
  );
}
