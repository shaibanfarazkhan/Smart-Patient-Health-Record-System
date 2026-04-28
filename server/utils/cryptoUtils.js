const crypto = require('crypto');

const generateRecordHash = (record) => {
    // Exclude metadata that might change
    const { _id, createdAt, __v, hash, ...dataToHash } = record;
    return crypto.createHash('sha256').update(JSON.stringify(dataToHash)).digest('hex');
};

const verifyRecordHash = (record) => {
    if (!record.hash) return false;
    const currentHash = generateRecordHash(record);
    return currentHash === record.hash;
};

module.exports = {
    generateRecordHash,
    verifyRecordHash
};
