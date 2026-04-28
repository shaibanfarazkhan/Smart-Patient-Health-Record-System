const express = require('express');
const MedicalRecord = require('../models/MedicalRecord');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const records = await MedicalRecord.find({ patientId: req.user._id }).sort({ date: -1 });
        res.send(records);
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const record = new MedicalRecord({
            ...req.body,
            patientId: req.user._id
        });
        await record.save();
        res.status(201).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const record = await MedicalRecord.findOneAndDelete({ _id: req.params.id, patientId: req.user._id });
        if (!record) {
            return res.status(404).send();
        }
        res.send(record);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
