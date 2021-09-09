import NodeRSA from 'node-rsa'

export const formatKey = (publicKey: string): string => {
  let key = ''
  const splited = publicKey.split('*')
  splited.map(str => {
    key += str + '\n'
  })
  return key
}

export const hash = (text: string, publicKey: string): string => {
  try {
    const rsa = new NodeRSA(formatKey(publicKey))
    return rsa.encrypt(text, 'base64')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Encrypt error', error)
    return 'INVALID'
  }
}
