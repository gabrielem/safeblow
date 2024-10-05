import Image from 'next/image';
import React from 'react';

interface NotFoundProps {
  notFoundLabel?: string;
}

const ItemNotFound: React.FC<NotFoundProps> = ({ notFoundLabel }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-semibold mb-4 text-center text-primary">{notFoundLabel || 'Item non trovato'}</h2>
      <div className='bg-white p-2 rounded-lg shadow-sm'>
        <Image src="/sorry-item-not-found.png" height={240} width={300} alt="Item not found" />
      </div>
    </div>
  );
};

export default ItemNotFound;