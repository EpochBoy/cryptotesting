"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const assert = require("assert");
// Generate Alice's keys...
const alice = crypto.createECDH('secp521r1');
const aliceKey = alice.generateKeys();
// Generate Bob's keys...
const bob = crypto.createECDH('secp521r1');
const bobKey = bob.generateKeys();
// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
console.log(`I AM ALICE SECRET: ${aliceSecret.toString('base64')}`);
const bobSecret = bob.computeSecret(aliceKey);
console.log(`I AM BOB SECRET: ${bobSecret.toString('base64')}`);
assert.deepStrictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
if (aliceSecret.toString('base64') === bobSecret.toString('base64')) {
    console.log('Secrets match');
}
else {
    console.log('Secrets do not match');
}
//# sourceMappingURL=crypt.js.map