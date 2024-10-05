// BgContainer.tsx
import React, { ReactNode } from 'react';

interface BgContainerProps {
  children: ReactNode;
  backgroundImage: string;
}

const BgContainer: React.FC<BgContainerProps> = ({ children, backgroundImage }) => {
  return (
    <div 
      className="relative bg-cover bg-center min-h-screen" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay nero con opacità al 70% */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Contenuto del div */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BgContainer;
