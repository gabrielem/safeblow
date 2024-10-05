'use client'

import React from "react";
import BgContainer from "@/components/BgContainer";
import Header from "@/components/Header";
import ItemNotFound from "@/components/ItemNotFound";
import { useRouter } from "next/navigation"; 

interface FormProps {
  params: {
    whistleType: 'anonymous' | 'not_anonymous';
  };
}

const Form: React.FC<FormProps> = ({ params }) => {
  const router = useRouter();

  const validWhistleTypes: Array<'anonymous' | 'not_anonymous'> = ['anonymous', 'not_anonymous'];
  const isValidWhistleType = validWhistleTypes.includes(params?.whistleType);

  return (
    <BgContainer backgroundImage="/bg.jpg">
      <Header />
      <div>
        <button 
            className="bg-[#0284c7] text-white px-6 py-2 rounded-lg ml-4"
            onClick={() => { router.push(`/`); }}>Back</button>
      </div>
      <div className="container mx-auto py-4 px-6 flex justify-center items-center">
      

        {isValidWhistleType ? (
          <>whistleType: {params?.whistleType}</>
        ) : (
          <ItemNotFound />
        )}
      </div>
    </BgContainer>
  );
}

export default Form;
