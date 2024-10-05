'use client'

import AnonymitySelector from "@/components/AnonymitySelector";
import BgContainer from "@/components/BgContainer";
import { useState } from "react";
// import Image from "next/image";

export default function Home() {

  const [whistleType, setWhistleType] = useState<'anonymous' | 'not_anonymous'>('anonymous');


  return (
    <BgContainer backgroundImage="/bg.jpg">
      <AnonymitySelector whistleType={whistleType} setWhistleType={setWhistleType} />
    </BgContainer>
  );
}
