const CryptoJS = require('crypto-js')

const base64url = (src) => {
  var srcBuffer = Buffer.from(JSON.stringify(src), 'utf8')
  let encodedSrc = srcBuffer.toString('base64').replace(/=+$/, '')
  return encodedSrc
}

const sign = (msg) => {
  const hmac = CryptoJS.HmacSHA256(msg, 'secret-goes-here')
  return hmac.toString(CryptoJS.enc.Base64).replace(/=+$/, '')
}

const tokenHeader = { "alg": "HS256", "typ": "JWT" }

const generate = (payload) => {
  let msg = base64url(tokenHeader) + '.' + base64url(payload)
  let signature = sign(msg)
  let token = msg + '.' + signature
  return token
}

const verify = (token) => {
  let components = token.split('.', 3)
  if(components.length !== 3) { return false }
  let msg = components[0] + '.' + components[1]
  let providedSignature = components[2]
  let computedSignature = sign(msg)
  return providedSignature === computedSignature
}

module.exports = {
  generate: generate,
  verify: verify
}
