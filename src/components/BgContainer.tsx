// BgContainer
import React, { ReactNode } from 'react';

interface BgContainerProps {
  children: ReactNode;
  backgroundImage: string;
}

const BgContainer: React.FC<BgContainerProps> = ({ children, backgroundImage }) => {
  return (
    <div 
      className="bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
};

export default BgContainer;