// IdentityForm
import { IdentityFormProps } from '@/types';
import React, { ChangeEvent, useEffect, useState } from 'react';
import WhistleForm from './WhistleForm';

const IdentityForm: React.FC<IdentityFormProps> = ({whistleType}) => {

    const [formData, setFormData] = useState({
        organization: "",
        name: "",
        surname: "",
        email: "",
        tlsCertificate: {},
      })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        })
    }

    useEffect(() => {
        console.log("FormData...", formData);
        
    }, [formData])

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="mb-4">
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
      </div>
        {whistleType === 'anonymous' 
            ? <>
                <WhistleForm />
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
                    <button 
                        type="button" 
                        className="w-full bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Check Identity
                    </button>
                    </div>
                </div>
            </>

        }
    </div>
  );
}

export default IdentityForm;
