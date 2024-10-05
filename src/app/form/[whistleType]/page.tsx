'use client'

import React from "react";
import BgContainer from "@/components/BgContainer";
import Header from "@/components/Header";
import ItemNotFound from "@/components/ItemNotFound";
import { useRouter } from "next/navigation"; 
import { IoIosArrowBack } from "react-icons/io";
import IdentityForm from "@/components/IdentityForm";
import { FormProps } from "@/types";


const Form: React.FC<FormProps> = ({ params }) => {
  const router = useRouter();

  // const validWhistleTypes: Array<'anonymous' | 'not_anonymous'> = ['anonymous', 'not_anonymous'];
  // const isValidWhistleType = validWhistleTypes.includes(params?.whistleType);
  const validWhistleTypes: Array<'anonymous' | 'not_anonymous'> = ['anonymous', 'not_anonymous'];
  const isValidWhistleType = validWhistleTypes.includes(params?.whistleType);
  return (
    <BgContainer backgroundImage="/bg.jpg">
      <Header />
      <div className="container mx-auto py-4 px-6">
        <button 
            className="bg-[#0284c7] text-white px-6 py-2 rounded-lg ml-4"
            onClick={() => { router.push(`/`); }}>
              <IoIosArrowBack className="mr-2 inline" /> Back
            </button>
      </div>
      <div className="container mx-auto py-4 px-6 justify-center items-center">
        {isValidWhistleType ? (
          <>
          <div>
            <IdentityForm whistleType={params?.whistleType} />
          </div>
          </>
          
        ) : (
          <ItemNotFound />
        )}
      </div>
    </BgContainer>
  );
}

export default Form;
