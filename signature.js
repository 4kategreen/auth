const crypto = require('crypto')

const base64url = (src) => {
  var srcBuffer = Buffer.from(JSON.stringify(src), 'utf8')
  let encodedSrc = srcBuffer.toString('base64').replace(/=+$/, '')
  return encodedSrc
}

const tokenHeader = { "alg": "RS256", "typ": "JWT" }

const buildSign = (privateKey) => {
  return (msg) => {
    const s = crypto.createSign('SHA256')
    s.write(msg)
    s.end()
    return s.sign(privateKey, 'base64')
  }
}

const buildGenerate = (sign) => {
  return (payload) => {
    let msg = base64url(tokenHeader) + '.' + base64url(payload)
    let signature = sign(msg)
    let token = msg + '.' + signature
    return token
  }
}

const buildVerify = (publicKey) => {
  return (token) => {
    let components = token.split('.', 3)
    if(components.length !== 3) { return false }
    let msg = components[0] + '.' + components[1]
    let providedSignature = components[2]
    let v = crypto.createVerify('SHA256')
    v.write(msg)
    v.end()
    return v.verify(publicKey, providedSignature, 'base64')
  }
}

const build = (privateKey, publicKey) => {
  return {
    generate: buildGenerate(buildSign(crypto.createPrivateKey(privateKey))),
    verify: buildVerify(crypto.createPublicKey(publicKey)),
    publicKey: publicKey
  }
}

module.exports = (options = {}) => {
  if(options.privateKey && options.publicKey) {
    return build(options.privateKey, options.publicKey)
  }
}
