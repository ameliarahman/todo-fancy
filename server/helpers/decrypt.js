const bcrypt = require('bcrypt');
module.exports = function (plainPassword, passwordDB) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, passwordDB, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    });
  })

}