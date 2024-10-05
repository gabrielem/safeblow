// IdentityForm
import { IdentityFormProps } from '@/types';
import React from 'react';

const IdentityForm: React.FC<IdentityFormProps> = ({whistleType}) => {
  return (
    <div className="container mx-auto p-4 text-white">
      <div className="mb-4">
        <label htmlFor="organization" className="block text-sm font-medium text-gray-100">Organization</label>
        <input 
          type="text" 
          id="organization" 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your organization" 
        />
      </div>
        {whistleType === 'anonymous' 
            ? <>
                ...
            </>
            : <>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-100">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Name" 
                    />
                    </div>

                    {/* Campo Surname */}
                    <div>
                    <label htmlFor="surname" className="block text-sm font-medium text-gray-100">Surname</label>
                    <input 
                        type="text" 
                        id="surname" 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Surname" 
                    />
                    </div>

                    {/* Campo Email */}
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
