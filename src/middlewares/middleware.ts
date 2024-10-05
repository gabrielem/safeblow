import admin from '@/config/firebase-admin'
import NextCors from 'nextjs-cors'
import { NextApiResponse } from 'next'
import { ExtendedNextApiRequest } from '@/types'

function createHttpError(message: string, status: number) {
  const error = new Error(message);
  (error as any).status = status;
  return error;
}

export async function checkIsAdmin(decodedToken: any, originalUrl?: string) {
  let isAdmin
  try {
    if (decodedToken.admin === true) {
      const adminUser = (await admin.database().ref(`admin/users/${decodedToken.uid}`).once('value')).val()
      if (adminUser) {
          const log = {
            timestamp: new Date().getTime(),
            uri: originalUrl ? originalUrl : 'undefined'
          }
              
        await admin.database().ref(`admin/logs/${decodedToken.uid}`).push(log)
        await admin.database().ref(`admin/users/${decodedToken.uid}/lastActivity`).set(log)
      }
  
      isAdmin = true
    }
    return isAdmin
  } catch (error) {
    throw error
  }
}

function getTokenFromHeader(headers: any) {
  const authHeader = headers.authorization;
  if (!authHeader) {
    console.log('Not authenticated. No Auth header', headers)
    throw createHttpError('Not authenticated. No Auth header', 401)
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    console.log('Not authenticated. No token', headers)
    throw createHttpError('Not authenticated. No Auth header', 401)
  }
  return token
}

export async function doAuth(token: string) {
    
  let decodedToken
  
  try {
    decodedToken = await admin.auth().verifyIdToken(token, true)
    if (!decodedToken.uid) {
      throw createHttpError('Unauthorized', 401)
    }
    
    return { decodedToken }

  } catch (error) {
    throw error
  }
}


export function withCors(handler: (req: ExtendedNextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
    })

    return handler(req, res)
  }
}

export function withAuth(handler: (req: ExtendedNextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
    })
    try {
      const token = getTokenFromHeader(req.headers)
      const { decodedToken } = await doAuth(token)
      
      const isAdmin = await checkIsAdmin(decodedToken, req.originalUrl)

      let ip = req.ip ?? req.headers['x-real-ip']
      const forwardedFor = req.headers['x-forwarded-for']

      if (forwardedFor && typeof forwardedFor === 'string') {
        ip = forwardedFor.split(',')[0].trim();
      } else {
        ip = 'Unknown';
      }

      req.authId = decodedToken.uid
      req.uid = decodedToken.uid
      req.userFirebase = decodedToken
      req.isAdmin = isAdmin
      req.user = {
        ip,
        isAdmin: decodedToken.admin || false
      }
    } catch (e) {
      console.log('Authentication error ?????')
      console.log(e)
      return res.status(401).send({ error: 'Unauthorized' })
    }

    return handler(req, res)
  }
}

export function withAdmin(handler: (req: ExtendedNextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    if (req.isAdmin) {
      return handler(req, res)
    }

    return res.status(401).send({ error: 'Unauthorized' })
  }
}