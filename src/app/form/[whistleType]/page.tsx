'use client'

import React from "react";
import BgContainer from "@/components/BgContainer";
import Header from "@/components/Header";
import ItemNotFound from "@/components/ItemNotFound";

interface FormProps {
  params: {
    whistleType: 'anonymous' | 'not_anonymous';
  };
}

const Form: React.FC<FormProps> = ({ params }) => {
  const validWhistleTypes: Array<'anonymous' | 'not_anonymous'> = ['anonymous', 'not_anonymous'];

  // Verifica se il whistleType è valido
  const isValidWhistleType = validWhistleTypes.includes(params?.whistleType);

  return (
    <BgContainer backgroundImage="/bg.jpg">
      <Header />
      <div className="container mx-auto py-4 px-6 flex justify-center items-center">
        {isValidWhistleType ? (
          // Se il whistleType è valido, mostra il suo valore
          <>whistleType: {params?.whistleType}</>
        ) : (
          // Se il whistleType non è valido, mostra il componente ItemNotFound
          <ItemNotFound />
        )}
      </div>
    </BgContainer>
  );
}

export default Form;
