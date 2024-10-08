'use client'

import AnonymitySelector from "@/components/AnonymitySelector";
import BgContainer from "@/components/BgContainer";
import Header from "@/components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [whistleType, setWhistleType] = useState<'anonymous' | 'not_anonymous'>('not_anonymous');
  const router = useRouter();

  const handleContinue = () => {
    router.push(`/form/${whistleType}`);
  };

  return (
    <BgContainer backgroundImage="/bg.jpg">
      <Header />
      <div className="container mx-auto py-4 px-6 flex justify-center items-center">
        <div>
          <AnonymitySelector whistleType={whistleType} setWhistleType={setWhistleType} />
        </div>
      </div>
      <div className="container mx-auto py-4 px-6 flex justify-center items-center">
        <button 
          className="bg-[#0284c7] text-white px-6 py-2 rounded-lg ml-4 text-"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </BgContainer>
  );
}
