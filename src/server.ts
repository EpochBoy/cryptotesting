import * as crypto from 'crypto';

const server = crypto.createECDH('secp521r1');
const serverPublicKey = server.generateKeys();

console.log(serverPublicKey.toString('hex'));

const serverPrivateKey = server.getPrivateKey();
console.log(serverPrivateKey.toString('hex'));
