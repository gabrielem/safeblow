// getAdmins
import { withAdmin, withAuth } from "@/middlewares/middleware"
import { getAdmins } from "@/modules/admin"
import { ExtendedNextApiRequest } from "@/types"
import { getErrorMessage } from "@/utils"
import { NextApiResponse } from "next"

async function getAdminsHandler(req: ExtendedNextApiRequest, res: NextApiResponse) {
    try {
        const data = await getAdmins()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({error: getErrorMessage(error)})
    }
}
export default withAuth(withAdmin(getAdminsHandler))