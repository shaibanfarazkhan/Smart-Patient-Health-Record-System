const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    doctorName: { type: String, required: true },
    hospitalName: { type: String, required: true },
    diagnosis: { type: String, required: true },
    prescription: { type: String, required: true },
    notes: { type: String },
    recordType: { 
        type: String, 
        enum: ['General Checkup', 'Emergency', 'Surgery', 'Lab Report', 'Vaccination'], 
        required: true 
    },
    hash: { type: String },
    createdAt: { type: Date, default: Date.now }
});

medicalRecordSchema.pre('save', function() {
    if (this.isNew || this.isModified()) {
        const crypto = require('crypto');
        const dataToHash = {
            patientId: this.patientId,
            date: this.date,
            doctorName: this.doctorName,
            hospitalName: this.hospitalName,
            diagnosis: this.diagnosis,
            prescription: this.prescription,
            notes: this.notes,
            recordType: this.recordType
        };
        this.hash = crypto.createHash('sha256').update(JSON.stringify(dataToHash)).digest('hex');
    }
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
