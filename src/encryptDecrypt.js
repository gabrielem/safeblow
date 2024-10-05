import { encrypt, decrypt, PrivateKey } from 'eciesjs'
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');


const getNewPrivateKey = () => {
    const privateKey = new PrivateKey()
    return privateKey.toHex()
}

const getPubkeyFromPrivateKey = (privateKey) => {
    return ec.keyFromPrivate(privateKey).getPublic('hex');
}

const encryptData = (publicKey, input) => {
    const inputString = typeof input === 'string' ? input : JSON.stringify(input);
    console.log('-->encryptData', {inputString});
    
    return encrypt(publicKey, Buffer.from(inputString)).toString('hex')
}

const decryptData = (privateKey, encryptedData) => {
    return decrypt(privateKey, Buffer.from(encryptedData, 'hex')).toString()
}

export {
    getNewPrivateKey,
    getPubkeyFromPrivateKey,
    encryptData,
    decryptData
}

// const privateKey = getNewPrivateKey()
// console.log({privateKey})
// const publicKey = getPubkeyFromPrivateKey(privateKey)
// console.log({publicKey})
// const data = 'Hello World'
// console.log({data})
// const encryptedData = encryptData(publicKey, data)
// console.log({encryptedData})
// const decryptedData = decryptData(privateKey, encryptedData)
// console.log({decryptedData})

