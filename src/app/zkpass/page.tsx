'use client'

import BgContainer from '@/components/BgContainer'
import Header from '@/components/Header'
import TransgateConnect from '@zkpass/transgate-js-sdk'
import { type ReactNode, useEffect, useState } from 'react'

interface resultPropType {
  schemaId: string
  data: Record<string, string> | undefined
}

export default function Home (): JSX.Element {
  const [liv1, setLiv1] = useState<resultPropType>()
  const [liv2, setLiv2] = useState<resultPropType>()
  const [error, setError] = useState<ReactNode | undefined>()

  const requestVerifyMessage = async (): Promise<void> => {
    try {
      const appid = '0d2a8f10-cf31-4650-9d00-0e6fb328fd27'

      const connector = new TransgateConnect(appid)
      const isAvailable = await connector.isTransgateAvailable()

      if (isAvailable) {
        const schemaIdLiv1 = '4b226bbae74349ed90a7a6d55c52f3ea'
        const liv1 = await connector.launch(schemaIdLiv1) as resultPropType
        setLiv1(liv1)

        const schemaIdLiv2 = '29ec995bc8834183b6c0d785784705a7'
        const liv2 = await connector.launch(schemaIdLiv2) as resultPropType
        setLiv1(liv2)

      } else {
        setError(
          <pre style={{ textAlign: 'center', color: 'red' }}>
            Please install zkPass Transgate from
            <a href='https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma'> here</a>
          </pre>
        )
      }
    } catch (error) {
      setError(
        <pre style={{ textAlign: 'center', color: 'red' }}>
          transgate error: {JSON.stringify(error, null, 2)}
        </pre>
      )
      console.log('transgate error', error)
    }
  }

  return (
    <BgContainer backgroundImage='/bg.jpg'>
      <Header />
      {error}
      <button
        style={{ margin: 'auto', display: 'block' }}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={requestVerifyMessage}
      >
        Verify KYC Level on ByBit
      </button>
      <pre>Liv1: {JSON.stringify(liv1, null, 2)}</pre>
      <pre>Liv2: {JSON.stringify(liv2, null, 2)}</pre>
    </BgContainer>
  )
}
