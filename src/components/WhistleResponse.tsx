// WhistleResponse.tsx
import React from 'react';

interface Props {
    whistleHash: string;
    whistleHashVerify: string;
}

const WhistleResponse: React.FC<Props> = ({ whistleHash, whistleHashVerify }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(whistleHash)
            .then(() => {
                alert('Code copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 mb-5">
            {whistleHash === whistleHashVerify ? (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Unique Identifier:</h2>
                    <div className="bg-gray-100 p-4 rounded-md border border-gray-300 relative">
                        <span className="text-sm font-mono text-blue-600">{whistleHash}</span>
                        <button 
                            onClick={copyToClipboard}
                            className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            Copy
                        </button>
                    </div>
                    <p className="mt-4 text-gray-600">
                        Keep this code! It is the only way to retrieve your information.
                    </p>
                    <p className="mt-2 text-gray-600">
                        This code allows you to track the status of your report securely, privately, and anonymously. 
                        Make sure to store it, as it is the key to accessing your case in the future.
                    </p>
                </div>
            ) : (
                <div className="text-red-600 font-semibold">
                    Error: Server HASH does not correspond
                </div>
            )}
        </div>
    );
};

export default WhistleResponse;
