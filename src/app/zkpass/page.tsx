'use client'

import BgContainer from '@/components/BgContainer'
import Header from '@/components/Header'
import { requestTlsVerifyResult } from '@/types'
import { requestTlsVerify } from '@/utils'
import React, { type ReactNode, useState } from 'react'

const ZkPassTest: React.FC = () => {
  const [verify, setVerify] = useState<requestTlsVerifyResult>()
  const [error, setError] = useState<ReactNode | undefined>()
  const [loading, setLoading] = useState(false)

  const handleRequestTlsVerify = async () => {
    setLoading(true)
    try {
      const response = await requestTlsVerify()
      setVerify(response)
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BgContainer backgroundImage='/bg.jpg'>
      <Header />
      {error && <div className='text-red-500'>{error}</div>}

      {error}
      <button
        style={{ margin: 'auto', display: 'block' }}
        className={`text-white font-bold py-2 px-4 rounded ${
            loading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-700'
        }`}
        onClick={handleRequestTlsVerify}
        disabled={loading}
      >
        {loading ? <b>Loading...</b> : 'Verify KYC Level on ByBit'}
      </button>

      {verify && <pre>verify: {JSON.stringify(verify, null, 2)}</pre>}
    </BgContainer>
  )
}

export default ZkPassTest