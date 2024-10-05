'use client'

import BgContainer from "@/components/BgContainer"
import WhistleList from "@/components/WhistleList"
import { useAuth } from "@/context/AuthContext"


const DashboardAdmin: React.FC = () => {
  const { logout } = useAuth()
    
    return (
      <BgContainer backgroundImage="/bg.jpg">
        <div className="flex justify-end p-3">
          <div>
            <button
                onClick={()=> logout() }
                className="bg-[#0284c7] text-white w-full text-lg py-3 px-4 rounded-lg mt-4 flex justify-center items-center"
              >
              LogOut
            </button>
          </div>
        </div>
        <div>
          <WhistleList />
        </div>
      </BgContainer>
    )
}

export default DashboardAdmin