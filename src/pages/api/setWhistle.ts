import { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/config/firebase-admin';
import { hashSHA256, sortObject } from '@/utils';

async function setWhistleHandler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { whistle } = req.body
        if (!whistle) throw 'Whistle data is required'

        const whistleHash = hashSHA256(whistle);
        await admin.database().ref(`whistle/${whistleHash}`).set(whistle);
        return res.send(whistleHash)

    } catch (error) {
        console.log('- - - - getAdmins - error')
        console.log(error)
        res.status(500).json({ error })
    }    

}

export default setWhistleHandler;