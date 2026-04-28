const express = require('express');
const AccessCode = require('../models/AccessCode');
const MedicalRecord = require('../models/MedicalRecord');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        const accessCode = new AccessCode({
            patientId: req.user._id,
            code,
            expiresAt
        });
        await accessCode.save();
        res.status(201).send({ code });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/verify', async (req, res) => {
    try {
        const { code } = req.body;
        const accessCode = await AccessCode.findOne({ code, expiresAt: { $gt: new Date() } });
        if (!accessCode) {
            return res.status(404).send({ error: 'Invalid or expired code' });
        }
        const records = await MedicalRecord.find({ patientId: accessCode.patientId }).sort({ date: -1 });
        res.send(records);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
