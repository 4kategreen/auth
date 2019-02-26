const { generateKeyPairSync } = require('crypto')
const { writeFileSync } = require('fs')

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
})

writeFileSync("id_rsa.pub", publicKey)
writeFileSync("id_rsa", privateKey)

console.log("Wrote key pair to 'id_rsa' and 'id_rsa.pub'.")