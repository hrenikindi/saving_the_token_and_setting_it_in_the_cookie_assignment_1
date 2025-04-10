const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key-here'; // In production, use environment variables

const encrypt = (payload) => {
  try {
    return jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256' });
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
}

const decrypt = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] });
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
}

// Test the functions
const testPayload = { userId: 123, role: 'admin' };
console.log('Original payload:', testPayload);

const token = encrypt(testPayload);
console.log('\nEncrypted token:\n', token);

const decoded = decrypt(token);
console.log('\nDecrypted payload:', decoded);

// Compare payloads ignoring the iat timestamp
const { iat, ...decodedWithoutIat } = decoded;
if (JSON.stringify(testPayload) === JSON.stringify(decodedWithoutIat)) {
  console.log('\n✅ Success: Encryption and decryption working correctly');
} else {
  console.log('\n❌ Error: Decrypted payload does not match original');
}

module.exports = {
  encrypt,
  decrypt
}
