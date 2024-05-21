// const crypto = require('crypto');

// function getHash(str, algo = "sha256") {
//     return new Promise((resolve, reject) => {
//         try {
//             let hash = crypto.createHash(algo);
//             hash.update(str);
//             resolve(hash.digest('hex'));
//         } catch (e) {
//             reject(e);
//         }
//     });
// }

// // Using the function with .then()
// getHash('hello world').then(hash => {
//     console.log(hash);  // Logs the hash value to the console
// }).catch(error => {
//     console.error('Error:', error);
// });


const crypto = require('crypto');

// Asynchronously calculate the hash of a message
async function hash(message) {
    const text_encoder = new TextEncoder();
    const data = text_encoder.encode(message);
    const hash = crypto.createHash('sha512');
    hash.update(data);
    return hash.digest();
} // -> Buffer

// Convert a data Buffer to a hexadecimal string
function in_hex(data) {
    return data.toString('hex');
} // -> string

// Demonstrate hashing and converting to hexadecimal
(async function demo() {
    console.log(in_hex(await hash("Thanks for the magic.")));
})();
