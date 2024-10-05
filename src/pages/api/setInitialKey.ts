import { getPubkeyFromPrivateKey } from '@/encryptDecrypt';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const key = getPubkeyFromPrivateKey("0568b314fe016a252d0fa149df900821f5e3a0e8cc1a072b37632f46ebae3af8")
        return res.send({key})

    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }    

}

export default handler;