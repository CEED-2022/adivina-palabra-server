import crypto from 'crypto'
const algorithm = 'aes-256-ctr'
const ENCRYPTION_KEY = '12345678901234567890123456789012' // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64')
const IV_LENGTH = 16

function enc(text) {
    let iv = crypto.randomBytes(IV_LENGTH)
    let cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, iv)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + ':' + encrypted.toString('hex')
}

function dec(text) {
    let textParts = text.split(':')
    let iv = Buffer.from(textParts.shift(), 'hex')
    let encryptedText = Buffer.from(textParts.join(':'), 'hex')
    let decipher = crypto.createDecipheriv(algorithm, ENCRYPTION_KEY, iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}

export {
  enc,
  dec
}
