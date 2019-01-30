const encryption = require('./encryption');
const crypto = require('crypto');
const zlib = require('zlib');
const fs = require('fs');

const transactionKey = "MbPeShVmYq3t6w9z$C&F)J@NcRfTjWnZ";
const coinKey = "2r5u8x!A%D*G-KaPdSgVkYp3s6v9y$B?";

const coin = {
  "transactions": [
    {
      value: 0,
      timestamp: new Date()
    }
  ]
}

function lockCoin(coin, coinKey) {
    
  var transactionHash = encryption.hash(transactionKey, '');
  const transactions = encryption.encrypt(JSON.stringify(coin.transactions), transactionHash);
  var coinHash = encryption.hash(coinKey, '');
  var promise = new Promise((resolve, reject) => {
    zlib.deflate(transactions, (err, buffer) => {
      if (!err) {
        coin.transactions = buffer.toString('base64');
        const value = encryption.encrypt(JSON.stringify(coin), coinHash);
        zlib.deflate(value, (err, buffer) => {
          resolve(buffer.toString('base64'));
        });
      } else {
        reject();
      }
    });

  });

  return promise;
}

function decrypt(coin, coinKey) {
  var coinHash = encryption.hash(coinKey, '');
  const buffer = Buffer.from(coin, 'base64');
  var promise = new Promise((resolve, reject) => {
    zlib.unzip(buffer, (err, buffer) => {
      if (!err) {
        const value = encryption.decrypt(buffer.toString(), coinHash);
        resolve(JSON.parse(value));
      } else {
        reject(value);
      }
    });  
  });

  return promise;
}

function decryptTransactions(transactions) {
  var transactionHash = encryption.hash(transactionKey, '');
  const buffer = Buffer.from(transactions, 'base64');
  var promise = new Promise((resolve, reject) => {
    zlib.unzip(buffer, (err, buffer) => {
      if (!err) {
        const value = encryption.decrypt(buffer.toString(), transactionHash);
        resolve(JSON.parse(value));
      } else {
        reject(value);
      }
    });  
  });

  return promise;
}

function encryptValue(value, key) {
  var hash = encryption.hash(key, '');
  var promise = new Promise((resolve, reject) => {
    zlib.deflate(value, (err, buffer) => {
      if (!err) {
        resolve(buffer.toString('base64'));
      } else {
        reject(err);
      }
    });

  });

  return promise;  
}

function validate(transactions) {
  var transactionHash = encryption.hash(transactionKey, '');
  for (var i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    if (i == 0) {
      const value = JSON.parse(encryption.decrypt(transaction.encryption, transactionHash));
      if (value.value != transaction.value || value.timestamp != transaction.timestamp) {
        return false;
      }
    } else {
      const value = JSON.parse(encryption.decrypt(transaction.encryption, transactionHash));
      // const previous = transactions[i-1];
      // if (value.value != previous.value || value.timestamp != previous.timestamp) {
      //   return false;
      // }      
    }
  }
  return true;
}

async function makeTransaction(coin, coinKey, value) {
  var transactionHash = encryption.hash(transactionKey, '');
  const decrypted = await decrypt(coin, "1234-5678-9101-1121");
  const transactions = await decryptTransactions(decrypted.transactions);
  if (validate(transactions)) {
    //Do transaction
    const last = JSON.stringify(transactions[transactions.length-1]);
    const encrypted = await encryptValue(last, transactionHash).catch(e => console.log(e));
    transactions.push({
      value: value,
      timestamp: new Date(),
      encryption: encrypted
    });
    decrypted.transactions = transactions;
    console.log(decrypted);
    return encryptCoin(decrypted, coinKey);    
  }
  return coin; 
}

let coin = fs.readFileSync('coin.vc', 'utf8');
coin = makeTransaction(coin, '1234-5678-9101-1121', 10).then(value => {
  makeTransaction(value, '1234-5678-9101-1121', 10).then(value => {
    console.log(value);
  });
})