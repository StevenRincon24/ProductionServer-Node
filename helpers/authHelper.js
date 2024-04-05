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

exports.generateRandomPassword = (length = 8) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

// COMPARE PASSWORD
exports.comparePassword = (password, hash) => {
    return bycrpt.compare(password, hash)
}