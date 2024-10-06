'use client'

import { useAuth } from "@/context/AuthContext"
import api from "@/helpers/api"
import { getErrorMessage } from "@/utils"
import { useEffect, useState } from "react"
import { FaHashtag, FaMessage } from "react-icons/fa6"
import { GoOrganization } from "react-icons/go"
import { toast } from "react-toastify"
import Loading from "./Loading"

const WhistleList = () => {
  const { token } = useAuth()

  const [list, setList] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)


  useEffect(() => {
    const getWhistles = async () => {
      try {
        const whistles = await api.admin.getWhistles(token)
        setList(whistles)
      } catch (error) {
        toast.error(getErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }
    getWhistles()
   }, [])


  return (
    <div className="bg-gray-900 p-3 rounded-md m-5">
      <div>
        <span className="font-bold text-3xl text-white">
          Whistle List
        </span>
        {isLoading 
          ? <div className="my-10"><Loading /></div>
          : <div className="w-full bg-gray-700 text-sm text-left rtl:text-right text-black-500 shadow-md mt-5 p-3 rounded-sm">
            {Object.keys(list).map((key, index) => {
                const item = JSON.parse(list[key])
                console.log('item', item);
                
                return (
                  <div key={index} className="p-3 rounded-md bg-gray-900 mb-2">
                    <div>
                      <FaHashtag className="inline" /> <span className="text-base font-semibold">{key}</span>
                      {item.tlsCertificate 
                        ? <span className="text-xs text-green-500"> (TLS Verified)</span>
                        : <span className="text-xs text-gray-500"> (Anonymous)</span>
                      }
                    </div>
                    <div>
                      <GoOrganization className='inline' /> {item.organization}
                    </div>
                    <div>
                      <FaMessage className='inline' /> {item.whistleMessage}
                    </div>
                  </div> 
                )
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default WhistleList