const crypto = require("crypto")

function sortObject(obj) {
    const sortedKeys = Object.keys(obj).sort()
    const result = {}

    for (const key of sortedKeys) {
        result[key] = obj[key]
    }

    return result
}

function createSecureHash(data, secretKey) {
    return crypto
        .createHmac("sha512", secretKey)
        .update(data, "utf-8")
        .digest("hex")
}

module.exports = {
    sortObject,
    createSecureHash
}