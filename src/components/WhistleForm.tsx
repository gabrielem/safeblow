// WhistleForm
import { WhistleFormProps } from '@/types';
import React, { ChangeEvent, useState } from 'react';

const WhistleForm: React.FC<WhistleFormProps> = ({ handleFormDataChange }) => {
    const [whistle, setWhistle] = useState("");

    // useEffect(() => {
    //     if (identityPayload) setWhistle({ ...whistle, identity: identityPayload });
    // }, [identityPayload]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        handleFormDataChange(e);
        setWhistle(e?.target?.value)
        
    }

    
    return (
        <div>
            <div className='max-w-md mx-auto bg-gray-700 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-5 text-white p-3'>
                <label htmlFor="whistleMessage" className="block text-md font-medium text-gray-100 pb-2">
                    Now you can add your Whistle Message:
                </label>
                <textarea
                    onChange={handleChange}
                    name="whistleMessage"
                    value={whistle}

                    id="whistleMessage"
                    className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your whistle message"
                    rows={4} // Imposta il numero di righe visibili
                />
            </div>
        </div>
    );
}

export default WhistleForm;
