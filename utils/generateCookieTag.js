const Crypto = require('crypto');

module.exports =  function generateCookieTag (size = 15) {  
  return Crypto
      .randomBytes(size)
      .toString('base64')
      .slice(0, size)
}
