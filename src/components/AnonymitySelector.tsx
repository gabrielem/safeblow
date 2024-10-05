// AnonymitySelector
import React from 'react';

interface AnonymitySelectorProps {
  whistleType: 'anonymous' | 'not_anonymous';
  setWhistleType: (type: 'anonymous' | 'not_anonymous') => void;
}

const AnonymitySelector: React.FC<AnonymitySelectorProps> = ({ whistleType, setWhistleType }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <label
        className={`flex items-center justify-center p-4 rounded-lg cursor-pointer ${
          whistleType === 'anonymous'
            ? 'border-2 border-[#0284c7] text-[#0284c7]'
            : 'border-2 border-white text-white'
        } bg-black transition-colors duration-200`}
      >
        <input
          type="radio"
          name="anonymity"
          value="anonymous"
          checked={whistleType === 'anonymous'}
          onChange={() => setWhistleType('anonymous')}
          className="sr-only"
        />
        <div className="flex items-center">
          <div
            className={`w-6 h-6 mr-3 rounded-full border-2 ${
              whistleType === 'anonymous'
                ? 'border-[#0284c7] bg-[#0284c7]'
                : 'border-white'
            } flex items-center justify-center`}
          >
            {whistleType === 'anonymous' && (
              <div className="w-3 h-3 rounded-full bg-white" />
            )}
          </div>
          <span className="text-lg font-medium">Anonymously</span>
        </div>
      </label>

      <label
        className={`flex items-center justify-center p-4 rounded-lg cursor-pointer ${
          whistleType === 'not_anonymous'
            ? 'border-2 border-[#0284c7] text-[#0284c7]'
            : 'border-2 border-white text-white'
        } bg-black transition-colors duration-200`}
      >
        <input
          type="radio"
          name="anonymity"
          value="not_anonymous"
          checked={whistleType === 'not_anonymous'}
          onChange={() => setWhistleType('not_anonymous')}
          className="sr-only"
        />
        <div className="flex items-center">
          <div
            className={`w-6 h-6 mr-3 rounded-full border-2 ${
              whistleType === 'not_anonymous'
                ? 'border-[#0284c7] bg-[#0284c7]'
                : 'border-white'
            } flex items-center justify-center`}
          >
            {whistleType === 'not_anonymous' && (
              <div className="w-3 h-3 rounded-full bg-white" />
            )}
          </div>
          <span className="text-lg font-medium">Not anonymously</span>
        </div>
      </label>
    </div>
  );
};

export default AnonymitySelector;