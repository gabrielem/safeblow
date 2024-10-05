import { setAdmin } from '@/modules/admin'
import { NextApiRequest, NextApiResponse } from 'next'

async function setAdminFirstHandler(req: NextApiRequest, res: NextApiResponse) {
    const email = 'niko@gmail.com'
    const toBeAdmin = true
    // const skipSameUser = true
    const skipSameUser = false
    try {
        const result =  await setAdmin(null, email, toBeAdmin, skipSameUser)
        return res.send({ result })
    } catch (error) {
        console.log('---setAdminFirstHandler', error)
        return res.status(404).send({error})
    }   
}
export default setAdminFirstHandler