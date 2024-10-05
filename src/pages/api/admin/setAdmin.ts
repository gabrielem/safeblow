import { withAdmin, withAuth, withCors } from '@/middlewares/middleware'
import { ExtendedNextApiRequest } from '@/modules/_types'
import { setAdmin } from '@/modules/admin'
import { getErrorMessage } from '@/utils/utils'
import { NextApiResponse } from 'next'


const setAdminHandler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const {email, toBeAdmin} = req.body
  try {
    const result =  await setAdmin(req.user.uid, email, toBeAdmin, false)
    return res.send({ result })
  } catch (error) {
    return res.status(400).json({error: getErrorMessage(error)})
  }
  
}

export default withAuth(withAdmin(setAdminHandler))

