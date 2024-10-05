// WhistleForm
import { IWhistleForm, WhistleFormProps } from '@/types';
import React, { ChangeEvent, useEffect, useState } from 'react';

const WhistleForm: React.FC<WhistleFormProps> = ({ identityPayload }) => {
    const [whistle, setWhistle] = useState<IWhistleForm>({
        whistleMessage: "",
    });

    useEffect(() => {
        if (identityPayload) setWhistle({ ...whistle, identity: identityPayload });
    }, [identityPayload]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setWhistle({
          ...whistle,
          [name]: value,
        })
    }

    useEffect(() => {
        console.log("whistle...", whistle);
        
    }, [whistle])

    return (
        <div>
            <h1>WhistleForm</h1>
            <div>
                <label htmlFor="whistleMessage" className="block text-sm font-medium text-gray-100">Whistle Message</label>
                <textarea
                    onChange={handleChange}
                    name="whistleMessage"
                    value={whistle?.whistleMessage}

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
