import TransgateConnect from '@zkpass/transgate-js-sdk'
import { requestTlsVerifyResult } from "./types"

const requestTlsVerify = async (): Promise<requestTlsVerifyResult> => {
    try {
      const appid = '0d2a8f10-cf31-4650-9d00-0e6fb328fd27'
  
      const connector = new TransgateConnect(appid)
      const isAvailable = await connector.isTransgateAvailable()
  
      if (isAvailable) {
        const dataSchema = '4b226bbae74349ed90a7a6d55c52f3ea'
        const response = await connector.launch(dataSchema) as requestTlsVerifyResult
        return response
  
      } else {
        throw {
          message: 'Transgate is not installed',
          code: 'install-transgate'
        }
      }
    } catch (error) {
      throw {
        message: JSON.stringify(error, null, 2),
        code: 'error-transgate'
      }
    }
  }

  export {
    requestTlsVerify
  }