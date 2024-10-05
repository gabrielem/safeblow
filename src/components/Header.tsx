// Header
import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="">
      <div className="container mx-auto py-4 px-6 flex justify-center items-center">
        <div className="w-40 h-12 flex items-center justify-center rounded">
            <Image src="/safe-blow-logo.png" alt="Whistle Logo" width={900} height={228} />
        </div>
      </div>
    </div>
  );
};

export default Header;