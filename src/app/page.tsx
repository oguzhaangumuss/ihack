'use client';

import Image from "next/image";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Spline Viewer script'ini dinamik olarak yükle
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.69/build/spline-viewer.js';
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/bg1.jpeg"
          alt="NFT Background"
          fill
          priority
          className="object-cover"
        />
      </div>
      
      {/* Spline Container */}
      <div className="absolute inset-0 z-10">
        <div 
          dangerouslySetInnerHTML={{
            __html: '<spline-viewer url="https://prod.spline.design/3OLc6AR1Af27Mvgg/scene.splinecode" class="w-full h-full"></spline-viewer>'
          }}
        />
      </div>
    </main>
  );
}
