'use client'

import { useAuth } from '@/context/AuthContext'
import { IFormLogin } from '@/types'
import { getErrorMessage, validateEmail } from '@/utils'
import Link from 'next/link'
import { useState, ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'


const FormLogin: React.FC = () => {
  const { signin, forgotPass, isAdmin } = useAuth()

  const [formAuth, setFormAuth] = useState<IFormLogin>({email: '', password: ''})
  const [isRecovery, setIsRecovery] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const handleSetFormAuth = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormAuth({ ...formAuth, [name]: value })
  }

  const handleSetRecovery = () => {
    setIsRecovery(!isRecovery)
  }


  const handleRecoveryLogin = async () => {
    const emailError = validateEmail(formAuth.email)
    if (emailError) {
        return toast.error(emailError)
    }

    setIsLoading(true)
    if(!isRecovery) {
      try {
        await signin({ email: formAuth.email, password: formAuth.password })
      } catch (error) {
        toast.error(getErrorMessage(error))
        setIsLoading(false)
      }
    } else {
      try {
        await forgotPass({ email: formAuth.email })
        toast.success('Recovery success')
        setFormAuth({email: '', password: ''})
      } catch (error) {
        toast.error(getErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center border" 
    >
      <div  className='absolute inset-0 bg-gradient-to-b from-black via-[rgba(0,0,0,0.75)] to-[rgba(0,0,0,0.5)]'></div>
      <div className='flex text-white flex-col items-center bg-black bg-opacity-90 p-10 rounded z-10'>
        <div>
          <Image 
            src={`/safe-blow-icon.png`} 
            alt='icon' 
            width={276} height={60} 
          />
        </div>
        <div className='w-full md:w-80 mt-4'>
          <div className='mt-3'>
            <input 
              className='bg-white border border-input text-black text-base rounded-lg focus:ring-gray focus:border-gray block w-full p-2.5'
              type="email" 
              placeholder="Email" 
              name='email'
              value={formAuth.email}
              onChange={handleSetFormAuth}
            />
          </div>
          {!isRecovery && <div className='mt-3'>
          <input 
              className='bg-white border border-input text-black text-base rounded-lg focus:ring-gray focus:border-gray block w-full p-2.5'
              placeholder="Password" 
              type="password"
              name='password'
              value={formAuth.password}
              onChange={handleSetFormAuth}
            />
          </div>}
          <button
            disabled={isLoading}
            onClick={handleRecoveryLogin}
            className="bg-[#0284c7] text-white w-full text-lg py-3 rounded-lg mt-4 flex justify-center items-center"
          >
            {isLoading ? 'Loading...' : !isRecovery ? 'Login' : 'Recovery'}
          </button>
          <div className='text-center mt-3'>
            <Link href='' onClick={handleSetRecovery} className='underline'>
              {!isRecovery ? 'Recovery password' : 'Back Home'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormLogin
