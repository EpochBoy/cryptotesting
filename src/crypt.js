"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var assert = require("assert");
// Generate Alice's keys...
var alice = crypto.createECDH('secp521r1');
var aliceKeys = alice.generateKeys();
var alicePrivateKey = alice.getPrivateKey();
var alicePublicKey = alice.getPublicKey();
console.log("Alice PRIVATE KEY: ".concat(alicePrivateKey.toString('hex')));
console.log("Alice PUBLIC KEY: ".concat(alicePublicKey.toString('hex')));
// Generate Bob's keys...
var bob = crypto.createECDH('secp521r1');
var bobKeys = bob.generateKeys();
var bobPrivateKey = bob.getPrivateKey();
var bobPublicKey = bob.getPublicKey();
console.log("Bob PRIVATE KEY: ".concat(bobPrivateKey.toString('hex')));
console.log("Bob PUBLIC KEY: ".concat(bobPublicKey.toString('hex')));
// ECDH: Exchange public keys for secure sessions
var aliceSecret = alice.computeSecret(bobKeys);
console.log("I AM ALICE SECRET: ".concat(aliceSecret.toString('hex')));
var bobSecret = bob.computeSecret(aliceKeys);
console.log("I AM BOB SECRET: ".concat(bobSecret.toString('hex')));
assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
if (aliceSecret.toString('base64') === bobSecret.toString('hex')) {
    console.log('Secrets match');
}
else {
    console.log('Secrets do not match');
}
var sharedMessageFromAlice = 'Alice says hi!';
var cipher = crypto.createCipher('aes-256-cbc', aliceSecret);
var encryptedMessage = cipher.update(sharedMessageFromAlice, 'utf8', 'hex');
encryptedMessage += cipher.final('hex');
console.log("I am encrypted message: ".concat(encryptedMessage));
var decipher = crypto.createDecipher('aes-256-cbc', bobSecret);
var decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8');
decryptedMessage += decipher.final('utf8');
console.log("I am decrypted message: ".concat(decryptedMessage));
console.log(bobKeys.toString('hex'));
// PKI: Public Key Infrastructure
var aliceMessage = 'Alice says hi!';
var iv = crypto.randomBytes(16);
// const encryptor = crypto.createCipheriv('aes', , iv);
// let encryptedMessage = encryptor.update(aliceMessage, 'utf8');
// console.log(encryptedMessage);
