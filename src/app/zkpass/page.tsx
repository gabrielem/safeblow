'use client'

import BgContainer from '@/components/BgContainer'
import Header from '@/components/Header'
import TransgateConnect from '@zkpass/transgate-js-sdk'
import Link from 'next/link'
import { type ReactNode, useEffect, useState } from 'react'

interface resultPropType {
  schemaId: string
  data: Record<string, string> | undefined
}

export default function Home (): JSX.Element {
  const [result, setResult] = useState<resultPropType>()
  const [error, setError] = useState<ReactNode | undefined>()

  const requestVerifyMessage = async (): Promise<void> => {
    try {
      const appid = '10ca5a7d-db96-40e6-9194-8f9cf1838558'

      const connector = new TransgateConnect(appid)
      const isAvailable = await connector.isTransgateAvailable()

      if (isAvailable) {
        const schemaId = '58754dde6b294f0292ade6d5ca5bc6ee'

        const res = await connector.launch(schemaId) as resultPropType
        setResult(res)
      } else {
        setError(
          <div style={{ textAlign: 'center', color: 'red' }}>
            Please install zkPass Transgate from
            <div>
              <Link
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                href='https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma'
                target='_blank'
                >
                  Here
              </Link>
            </div>

          </div>
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

  useEffect(() => {
    requestVerifyMessage().catch(console.error)
  }, [])

  return (
    <BgContainer backgroundImage='/bg.jpg'>
      <Header />
      {error}
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </BgContainer>
  )
}
