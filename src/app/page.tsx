'use client'

import AnonymitySelector from "@/components/AnonymitySelector";
import BgContainer from "@/components/BgContainer";
import Header from "@/components/Header";
import { useState } from "react";
// import Image from "next/image";

export default function Home() {

  const [whistleType, setWhistleType] = useState<'anonymous' | 'not_anonymous'>('anonymous');


  return (
    <BgContainer backgroundImage="/bg.jpg">
      <Header />
      
      <AnonymitySelector whistleType={whistleType} setWhistleType={setWhistleType} />
    </BgContainer>
  );
}
