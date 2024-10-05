import React from 'react';
import { BsBuildingsFill, BsEnvelope } from 'react-icons/bs';
import { FaPerson } from 'react-icons/fa6';
import { LiaStampSolid } from 'react-icons/lia';
import { PiSealCheckBold } from 'react-icons/pi';


const VerifiedBadge: React.FC<any> = ({ formData }) => {
  return (
    <>
    <div className="max-w-full mx-auto bg-green-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-5 text-white p-3">
        <LiaStampSolid className="inline w-7 h-7" /> Congratulations, you have successfully verified your personal information! 
    </div>
    <div className="max-w-md mx-auto bg-slate-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-5 border-[#0284c7] border">
      <div className="md:flex p-5">
        {/* Sezione per l'icona */}
        <div className="flex-shrink-0">
          <PiSealCheckBold className="text-[#0284c7] w-10 h-10" /> {/* Icona Star */}
        </div>

        {/* Sezione per il testo */}
        <div className="ml-4">
          <div className="uppercase tracking-wide text-sm text-[#0284c7] font-semibold">
            <BsBuildingsFill className="inline w-4 h-4" /> {formData.organization}
          </div>
          <p className="mt-2 text-gray-500">
            <FaPerson className="inline w-4 h-4" /> {formData.name} {formData.surname}
          </p>
          <p className="mt-2 text-gray-500">
            <BsEnvelope className="inline w-4 h-4" /> {formData.email}
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default VerifiedBadge;
