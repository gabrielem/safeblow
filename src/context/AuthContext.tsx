'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User
} from 'firebase/auth'
import { auth } from '@/config/firebase'
import FormLogin from '@/components/FormLogin'
import { toast } from 'react-toastify'
import { AuthContextProps } from '@/types'
import Loading from '@/components/Loading'

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
  export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        getToken()
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  useEffect(() => {
    const tokenRefreshInterval = setInterval(() => {
      getToken()
    }, 30 * 60 * 1000)
    return () => clearInterval(tokenRefreshInterval)
  }, [])

  useEffect(() => {
    const handleStatusChange = () => {
      getToken()
    }
    window.addEventListener("online", handleStatusChange)
    return () => { window.removeEventListener("online", handleStatusChange)}
  }, [])


  
  const getToken = async () => {    
    if (auth && auth?.currentUser) {
      try {
        const token = await auth.currentUser.getIdToken(true)
        setToken(token)
        return token
      } catch (error) {
        console.log({ error })
        throw error
      }
    } else {
      return ''
    }
  }

      
  const signin = async (payload: { email: string, password: string }) => {
    try {
      const authResult: any = await signInWithEmailAndPassword(auth, payload.email, payload.password)
      const admin = authResult?.reloadUserInfo?.customAttributes ? JSON.parse(authResult.reloadUserInfo?.customAttributes).admin : false
      if(admin) {
        setIsAdmin(admin)
        setUser(authResult.user)
        return authResult
      } else {
        throw new Error('Unautorazed')
      }
    } catch (error) {
      setIsAdmin(false)
      setUser(null)
      console.log('### signin - error', error)
      throw error
    }
  }

  const logout = async () => {
    return await signOut(auth).then(() => {
      setIsAdmin(false)
      setUser(null)
      setToken('')
    })
  }


  const forgotPass = async (payload: { email: string }) => {
    return await sendPasswordResetEmail(auth, payload.email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser: any) => {
      console.log('authUser', authUser)
      if (authUser) {
        const admin = authUser?.reloadUserInfo?.customAttributes ? JSON.parse(authUser.reloadUserInfo?.customAttributes).admin : false
        if(admin) {
          const token = await authUser.getIdToken(true)
          setIsAdmin(admin)
          setToken(token)
          setUser(authUser)
        } else {
          setIsAdmin(false)
          setUser(null)
          setToken('')
        }
      } else {
        setIsAdmin(false)
        setUser(null)
        setToken('')
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])


  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        user,
        token,
        loading,
        logout,
        signin,
        forgotPass,
        auth, 
        getToken
      }}
    >
      {loading 
        ? <div className='h-full'><Loading /></div> 
        : <div>{!isAdmin 
          ? <FormLogin />
          : children}
            </div>
      }
    </AuthContext.Provider>
  )
}