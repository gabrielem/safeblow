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
    <div className="bg-white p-3 rounded-md m-5">
      <div>
        <span className="font-bold text-3xl text-black">Whistle List</span>
        {isLoading 
          ? <div className="my-10"><Loading /></div>
          :<table className="w-full bg-white text-sm text-left rtl:text-right text-black-500 shadow-md border mt-5">
            <tbody>
            {Object.keys(list).map((key, index) => {
                const item = list[key]
                return (
                  <tr key={index} className="border-b">
                      <td colSpan={2} className="flex items-center px-6 py-4 text-black">
                          <FaHashtag size='1.5rem' className="text-black-500" />
                          <div className="ps-3">
                              <div className="text-base font-semibold">{key}</div>
                          </div>  
                      </td>
                      <td colSpan={2} className="flex items-center px-6 py-4 text-black">
                          <GoOrganization size='1.5rem' />
                          <div className="ps-3">
                              <div className="text-base font-semibold">{item.organization}</div>
                          </div>  
                      </td>
                      <td colSpan={2} className="flex items-center px-6 py-4 text-black">
                          <FaMessage size='1.5rem' />
                          <div className="ps-3">
                              <div className="text-base font-semibold">{item.whistleMessage}</div>
                          </div>  
                      </td>
                  </tr> 
                )
            })}
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default WhistleList