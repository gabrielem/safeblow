import { encrypt, decrypt, PrivateKey } from 'eciesjs'
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1'); // Curva ellittica secp256k1


const getNewPrivateKey = () => {
    const privateKey = new PrivateKey()
    return privateKey.toHex()
}

const getPubkeyFromPrivateKey = (privateKey) => {
    return ec.keyFromPrivate(privateKey).getPublic('hex');
}

const encryptData = (publicKey, data) => {
    return encrypt(publicKey, Buffer.from(data)).toString('hex')
}

const decryptData = (privateKey, encryptedData) => {
    return decrypt(privateKey, Buffer.from(encryptedData, 'hex')).toString()
}

const privateKey = getNewPrivateKey()
console.log({privateKey})
const publicKey = getPubkeyFromPrivateKey(privateKey)
console.log({publicKey})
const data = 'Hello World'
console.log({data})
const encryptedData = encryptData(publicKey, data)
console.log({encryptedData})
const decryptedData = decryptData(privateKey, encryptedData)
console.log({decryptedData})

