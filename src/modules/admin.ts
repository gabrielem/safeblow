import admin from '@/config/firebase-admin'
import { decryptData } from '@/encryptDecrypt'
import { getErrorMessage } from '@/utils'


const setAdmin = async (uid: string | null, email: string, toBeAdmin: boolean, skipSameUser: boolean) => {
    if (!email) {
        console.error({error: 'email is required'})
        throw new Error('email is required')
    }
    let user
    // Get user by email

    try {
        user = await admin.auth().getUserByEmail(email)
        console.log('user found!')
    } catch (error) {
        console.error(error)
        throw getErrorMessage(error)
    }
    
    
    if (!user) {
        console.log('Error...', {error: 'user by email not found'})
        throw new Error('user by email not found')
    }
    if (user.uid === uid && !skipSameUser) {
        console.log('Same User!', {error: 'user cant be the current'})
        throw new Error('user cant be the current')
    }

    
    try {
        // Get UserType
        if (toBeAdmin) {
          // Check user admin or not
          if (user.customClaims?.admin) {
            console.log('', {error: 'user is admin'})
            // return res.status(404).send({error: {message: 'user is admin'}})
            throw new Error('user is admin')
          }
          // Update and connect userType user from DB
          // Add as an admin
          await admin.auth().setCustomUserClaims(user.uid, {admin: true})
          // Denormalization: add the user to the admin list
          await admin.database().ref(`admin/users/${user.uid}`).set({email})
        } else {
          // Update and disconnect userType user from DB
          // Remove as admin...
          await admin.auth().setCustomUserClaims(user.uid, {admin: false})
          // Denormalization: REMOVE the user to the admin list
          await admin.database().ref(`admin/users/${user.uid}`).remove()
        }
        // return res.send({result: true})
        return true
      } catch (error) {
        console.error(error)
        throw getErrorMessage(error)
        //return res.status(400).send({error})
      }
}

const getAdmins = async () => {
  try {
    return (await admin.database().ref(`admin/users`).once('value')).val()
  } catch (error) {
    console.log('getAdmins - error', error)
    throw error
  }
}

const getWhistles = async () => {
  try {
    const results = (await admin.database().ref(`whistle`).once('value')).val()
    let decrytedResults: any = {}
    for (const key in results) {
      console.log('key', results[key]);
      decrytedResults[key] = decryptData(process.env.PRIVATE_KEY, results[key])
      // result[key].whistleMessage = result[key].whistleMessage.slice(0, 20)
    }
    
    return decrytedResults
  } catch (error) {
    console.log('getWhistles - error', error)
    throw error
  }
}

export { 
  setAdmin,
  getAdmins,
  getWhistles
}