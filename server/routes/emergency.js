const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('name bloodGroup allergies emergencyContact');
        if (!user || user.role !== 'patient') {
            return res.status(404).send({ error: 'Emergency profile not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
