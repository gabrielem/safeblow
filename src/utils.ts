import TransgateConnect from '@zkpass/transgate-js-sdk'
import { requestTlsVerifyResult } from "./types"
import { createHash } from 'crypto';

const requestTlsVerify = async (): Promise<requestTlsVerifyResult> => {
    try {
      const appid = process.env.NEXT_PUBLIC_ZKPASS_APP_ID || ""
  
      const connector = new TransgateConnect(appid)
      const isAvailable = await connector.isTransgateAvailable()
  
      if (isAvailable) {
        const dataSchema = process.env.NEXT_PUBLIC_ZKPASS_SCHEMA || ""
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

const validateIdentityFormCheck = (formData: any) => {
    // const { organization, name, surname, email, tlsCertificate } = formData;
    const { organization, name, surname, email} = formData;
    if (!organization) throw 'Organization is required'
    if (!name) throw 'Name is required'
    if (!surname) throw 'Surname is required'
    if (!email) throw 'Email is required'
};

const sortObject = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortObject);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((sortedObj: any, key: string) => {
          sortedObj[key] = sortObject(obj[key]);
          return sortedObj;
        }, {});
    }
    return obj;
  };  

  const getErrorMessage = (error: any) => {
    // console.log('❌❌❌ getErrorMessage', error)
    if (error && (typeof error === 'string' || error instanceof String)) {
        return error
    } else if (error?.response?.data?.error?.message) {
        return error.response.data.error.message
    } else if (error?.response?.data?.error?.detail) {
        return error.response.data.error.detail
    } else if (error?.response?.data?.error) {
        return error.response.data.error
    } else if (error?.response?.data?.message) {
        return error.response.data.message
    } else if (error?.request?.statusText) {
        return error.request.statusText
    } else if (error?.request?.status) {
        return error.request.status
    } else if (error?.message) {
        return error.message
    } else {
        return "Server error"
    }
  }

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) {
      return 'Email not valid!'
    }
    const emailPattern: any = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
    if (!emailPattern.test(email)) {
      return 'Email is empty'
    }
    return null
}

  const hashSHA256 = (input: any) => createHash('sha256').update(JSON.stringify(input)).digest('hex')

  export {
    requestTlsVerify,
    validateIdentityFormCheck,
    sortObject,
    getErrorMessage,
    validateEmail,
    hashSHA256
  }