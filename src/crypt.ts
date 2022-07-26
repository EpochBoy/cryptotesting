import * as crypto from 'crypto';
import * as assert from 'assert';

// Generate Alice's keys...
const alice = crypto.createECDH('secp521r1');
const aliceKeys = alice.generateKeys();
const alicePrivateKey = alice.getPrivateKey();
const alicePublicKey = alice.getPublicKey();

console.log(`Alice PRIVATE KEY: ${alicePrivateKey.toString('hex')}`);
console.log(`Alice PUBLIC KEY: ${alicePublicKey.toString('hex')}`);

// Generate Bob's keys...
const bob = crypto.createECDH('secp521r1');
const bobKeys = bob.generateKeys();
const bobPrivateKey = bob.getPrivateKey();
const bobPublicKey = bob.getPublicKey();

console.log(`Bob PRIVATE KEY: ${bobPrivateKey.toString('hex')}`);
console.log(`Bob PUBLIC KEY: ${bobPublicKey.toString('hex')}`);

// ECDH: Exchange public keys for secure sessions
const aliceSecret = alice.computeSecret(bobKeys);
console.log(`I AM ALICE SECRET: ${aliceSecret.toString('hex')}`);
const bobSecret = bob.computeSecret(aliceKeys);
console.log(`I AM BOB SECRET: ${bobSecret.toString('hex')}`);

assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));

if (aliceSecret.toString('base64') === bobSecret.toString('hex')) {
	console.log('Secrets match');
} else {
	console.log('Secrets do not match');
}

const messageFromAlice = 'Hi Bob!';

let cipher = crypto.createCipher('aes-256-cbc', aliceSecret);
let encryptedMessage = cipher.update(messageFromAlice, 'utf8', 'hex');
encryptedMessage += cipher.final('hex');
console.log(`I am encrypted message: ${encryptedMessage}`);

let decipher = crypto.createDecipher('aes-256-cbc', bobSecret);
let decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8');
decryptedMessage += decipher.final('utf8');
console.log(`I am decrypted message: ${decryptedMessage}`);
