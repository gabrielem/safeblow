import { AxiosRequestParams } from '@/types'
import { getErrorMessage } from '@/utils'
import axios, { AxiosInstance, AxiosResponse } from 'axios'

const baseURL = '/api/'
const apiClient: AxiosInstance = axios.create({ baseURL })

const buildTheRequest = async ({method, url, payload, token}: AxiosRequestParams) => {
    if (method !== 'post' && method !== 'get') { throw new Error('Metodo API non consentito!') }
    if (!url) { throw new Error('API URL non trovato!') }

    const config: [string, any?, { headers: { authorization: string } }?] = [url];

    const tokenIndex = payload ? 2 : 1
    if (payload) {  config[1] = payload  }
    if (token) {  config[tokenIndex] = {headers: {authorization: `Bearer ${token}`}} }
    try {
        const response: AxiosResponse<any> = await apiClient[method](...config)
        return response.data
    } catch (error) {
        console.log('❌ buildTheRequest - error', error)
        throw getErrorMessage(error)
    }
}
const api = {
    admin: {
      async getUsers (payload: any, token: string | null | undefined) {
        return buildTheRequest({method: 'post', url: '/admin/getUsers', payload, token})
      },
      async getUser (payload: any, token: string | null | undefined) {
        return buildTheRequest({method: 'post', url: '/admin/getUser', payload, token})
      },
      async getAdmins (token: string | null | undefined) {
        return buildTheRequest({method: 'get', url: '/admin/getAdmins', token})
      },
      async setAdmin (payload: any, token: string | null | undefined) {
        return buildTheRequest({method: 'post', url: '/admin/setAdmin', payload, token})
      },
      // getCustomToken
      async getCustomToken (payload: any, token: string | null | undefined) {
        return buildTheRequest({method: 'post', url: '/admin/getCustomToken', payload, token})
      },
      async getWhistles (token: string | null | undefined) {
        return buildTheRequest({method: 'get', url: '/admin/getWhistles', token})
      },
      
    },
    async setWhistle (payload: any) {
        return buildTheRequest({method: 'post', url: '/setWhistle', payload})
    },
}

export default api