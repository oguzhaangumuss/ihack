'use client';

import { FC } from 'react';

interface VaultButtonProps {
  onClick: () => void;
}

const VaultButton: FC<VaultButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="relative group"
    >
      {/* Ana buton gövdesi */}
      <div className="w-20 h-40 bg-zinc-800 relative rounded-sm border border-zinc-700 shadow-lg 
                    transform transition-all duration-300 group-hover:shadow-[#5be2b3]/20">
        
        {/* Elektrik efekti konteyneri */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Yatay elektrik çizgileri */}
          <div className="absolute left-0 right-0 h-[2px] top-1/2 -translate-y-1/2
                        bg-[#5be2b3] opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        shadow-[0_0_10px_#5be2b3] blur-[2px]" />
          
          {/* Dikey elektrik çizgileri */}
          <div className="absolute top-0 bottom-0 w-[2px] left-1/2 -translate-x-1/2
                        bg-[#5be2b3] opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        shadow-[0_0_10px_#5be2b3] blur-[2px]" />
        </div>

        {/* Metal vidalar */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-zinc-600" />
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-zinc-600" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-zinc-600" />
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-zinc-600" />
        
        {/* Hover durumunda parlayan kenarlar */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 border border-[#5be2b3]/30" />
          <div className="absolute inset-0 border-2 border-[#5be2b3]/10 blur-[2px]" />
        </div>
      </div>
    </button>
  );
};

export default VaultButton; 