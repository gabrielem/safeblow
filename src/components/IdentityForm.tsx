// IdentityForm
import { IdentityFormProps } from '@/types';
import React, { ChangeEvent, useEffect, useState } from 'react';
import WhistleForm from './WhistleForm';
import { requestTlsVerify, validateIdentityFormCheck } from '@/utils';
import { toast } from 'react-toastify';
import { BsSend } from 'react-icons/bs';
import VerifiedBadge from './VerifiedBadge';

const IdentityForm: React.FC<IdentityFormProps> = ({whistleType}) => {
    const [loadingCheckIdentity, setLoadingCheckIdentity] = useState(false)
    const [tlsCertificate, setTlsCertificate] = useState<any>()
    
    const [formData, setFormData] = useState({
        organization: "",
        name: "",
        surname: "",
        email: "",
        tlsCertificate
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        })
    }

    // useEffect(() => { console.log("FormData...", formData); }, [formData])

    const handleCheckIdentity = async (e: any) => {
        e.preventDefault()
        
        setLoadingCheckIdentity(true)
        try {
            validateIdentityFormCheck(formData)
            console.log("Check Identity...", formData);
            const checkResult = await requestTlsVerify()
            console.log("Check Result...", checkResult);
            setTlsCertificate(checkResult)
            setFormData({ ...formData, tlsCertificate: checkResult})
            
        } catch (error: any) {
            console.error("❌❌❌ Error Check Identity...", error);
            toast.error(error?.message 
                ? error.message 
                : (typeof error === 'string' 
                    ? error 
                    : 'Error Check Identity')
                )    
        } finally {
            setLoadingCheckIdentity(false)
        }
    }

    const handleSubmit = async () => {
        console.log("Submit...", formData);
    }

  return (
    <div className="container mx-auto p-4 text-white">
      {!tlsCertificate && <div className="mb-4">
        <label htmlFor="organization" className="block text-sm font-medium text-gray-100">Organization</label>
        <input 
            onChange={handleChange}
            name="organization"
            value={formData?.organization}
            type="text" 
            id="organization" 
            className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your organization" 
        />
      </div>}
        {whistleType === 'anonymous'  
            ? <>
                <WhistleForm handleFormDataChange={handleChange} />
            </>
            : <>
                {tlsCertificate
                    ? <>
                        <VerifiedBadge formData={formData} />
                        <WhistleForm handleFormDataChange={handleChange} />
                    </>
                    : <>
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-100">Name</label>
                            <input 
                                onChange={handleChange}
                                name="name"
                                value={formData?.name}

                                type="text" 
                                id="name" 
                                className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Name" 
                            />
                            </div>

                            {/* Campo Surname */}
                            <div>
                            <label htmlFor="surname" className="block text-sm font-medium text-gray-100">Surname</label>
                            <input 
                                onChange={handleChange}
                                name="surname"
                                value={formData?.surname}

                                type="text" 
                                id="surname" 
                                className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Surname" 
                            />
                            </div>

                            {/* Campo Email */}
                            <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email</label>
                            <input 
                                onChange={handleChange}
                                name="email"
                                value={formData?.email}

                                type="email" 
                                id="email" 
                                className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Email" 
                            />
                            </div>

                            {/* Bottone Check Identity */}
                            <div className="flex items-end">
                                {loadingCheckIdentity
                                    ? <span className="">Loading...</span>
                                    : <button 
                                    type="button" 
                                    className="w-full bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    onClick={handleCheckIdentity}
                                >
                                    Check Identity
                                </button>

                                }
                            
                            </div>
                        </div>
                    </>
                }
            </>

        }
        {whistleType === 'anonymous' || tlsCertificate
            ? <div>
                <button
                    className="bg-[#0284c7] text-white w-full text-lg py-3 rounded-lg mt-4 flex justify-center items-center"
                    onClick={handleSubmit}
                >
                    <BsSend className="inline mr-2" /> Submit
                </button>

            </div>
            : null
        }
    </div>
  );
}

export default IdentityForm;
