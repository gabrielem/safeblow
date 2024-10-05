import { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/config/firebase-admin';
import CryptoJS from 'crypto-js'
import { sortObject } from '@/utils';

async function setWhistleHandler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { whistle } = req.body
        if (!whistle) throw 'Whistle data is required'

        const whistleHash = CryptoJS.SHA256(sortObject(whistle)).toString();
        await admin.database().ref(`whistle/${whistleHash}`).set(whistle);
        return res.send(whistleHash)

    } catch (error) {
        console.log('- - - - getAdmins - error')
        console.log(error)
        res.status(500).json({ error })
    }    

}

export default setWhistleHandler;