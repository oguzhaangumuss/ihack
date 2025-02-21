'use client';

import { FC } from 'react';
import Image from 'next/image';

interface LockButtonProps {
  onClick: () => void;
  className?: string;
}

const LockButton: FC<LockButtonProps & { className?: string }> = ({ onClick, className }) => {
  return (
    <button 
      onClick={onClick}
      className={`relative group transition-all duration-300 ${className}`}
    >
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        <Image
          src="/images/button/kilit.png"
          alt="Lock Icon"
          width={400}
          height={400}
          className="transition-all duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-[#5be2b3]/10 blur-3xl rounded-full" />
        </div>
        <div className="absolute -left-32 -right-32 top-1/2 h-[4px] 
                      bg-[#5be2b3] opacity-0 group-hover:opacity-70 
                      transition-opacity duration-300 
                      shadow-[0_0_30px_#5be2b3] blur-[4px]" />
      </div>
    </button>
  );
};

export default LockButton; 