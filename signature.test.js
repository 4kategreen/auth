const signature = require('./signature')

const jsc = require('jsverify')

test('example token can be verified', () => {
  expect(signature.verify(signature.generate({"id": "1337", "username": "John Doe"}))).toBe(true)
})

test('all tokens can be verified', () => {
  let signatureRoundTrip = jsc.forall("json", (payload) => {
    return signature.verify(signature.generate(payload))
  })

  jsc.assert(signatureRoundTrip)
})

test('modified tokens are not verified', () => {
  let signatureTamperedRoundTrip = jsc.forall("json", (payload) => {
    let token = signature.generate(payload) + 'nonsense'
    return !signature.verify(token)
  })

  jsc.assert(signatureTamperedRoundTrip)
})
