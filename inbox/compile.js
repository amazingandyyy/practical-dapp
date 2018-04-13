const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

const source = fs.readFileSync(inboxPath, 'utf8');
const compiled = solc.compile(source, 1).contracts[':Inbox'];

module.exports = {
  interfacee: compiled.interface,
  bytecode: compiled.bytecode
};