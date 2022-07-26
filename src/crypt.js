"use strict";
exports.__esModule = true;
var crypto = require("crypto");
var assert = require("assert");
// Generate Alice's keys...
var alice = crypto.createECDH('secp521r1');
var aliceKey = alice.generateKeys();
// Generate Bob's keys...
var bob = crypto.createECDH('secp521r1');
var bobKey = bob.generateKeys();
// Exchange and generate the secret...
var aliceSecret = alice.computeSecret(bobKey);
console.log("I AM ALICE SECRET: ".concat(aliceSecret.toString('base64')));
var bobSecret = bob.computeSecret(aliceKey);
console.log("I AM BOB SECRET: ".concat(bobSecret.toString('base64')));
assert.deepStrictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
if (aliceSecret.toString('base64') === bobSecret.toString('base64')) {
    console.log('Secrets match');
}
else {
    console.log('Secrets do not match');
}
