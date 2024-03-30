const bycrpt = require('bcrypt')

// HASH PASSWORD
exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bycrpt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err)
            }
            bycrpt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        });
    });
}

// COMPARE PASSWORD
exports.comparePassword = (password, hash) => {
    return bycrpt.compare(password, hash)
}