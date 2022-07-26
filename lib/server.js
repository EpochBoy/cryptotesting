"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const alicePrivateKey = crypto.createPrivateKey('secp521r1');
console.log(alicePrivateKey.toString());
//# sourceMappingURL=server.js.map