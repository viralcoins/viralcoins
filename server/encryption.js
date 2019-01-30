'use strict';

const crypto = require('crypto');

const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text, key) {
 let iv = crypto.randomBytes(IV_LENGTH);
 let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
 let encrypted = cipher.update(text);

 encrypted = Buffer.concat([encrypted, cipher.final()]);

 return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text, key) {
 let textParts = text.split(':');
 let iv = new Buffer(textParts.shift(), 'hex');
 let encryptedText = new Buffer(textParts.join(':'), 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(key), iv);
 let decrypted = decipher.update(encryptedText);

 decrypted = Buffer.concat([decrypted, decipher.final()]);

 return decrypted.toString();
}

function hash(salt, encoding) {
  return crypto.createHash('sha256').update(salt).digest(encoding);
}

module.exports = { decrypt, encrypt, hash };