const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const MedicalRecord = require('./models/MedicalRecord');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data for this email to avoid duplicates
        await User.deleteOne({ email: 'farazkhan777173@gmail.com' });

        const hashedPassword = await bcrypt.hash('Faraz@173', 8);
        const user = new User({
            name: 'Faraz Khan',
            email: 'farazkhan777173@gmail.com',
            password: hashedPassword,
            role: 'patient'
        });

        await user.save();
        console.log('Patient created successfully');

        const records = [
            {
                patientId: user._id,
                date: new Date('2026-01-15'),
                doctorName: 'Dr. Sarah Wilson',
                hospitalName: 'Apollo Hospital',
                diagnosis: 'Seasonal Influenza',
                prescription: 'Oseltamivir 75mg, Paracetamol 500mg',
                notes: 'Patient presented with high fever and body aches. Advised 5 days rest.',
                recordType: 'General Checkup'
            },
            {
                patientId: user._id,
                date: new Date('2026-03-20'),
                doctorName: 'Dr. Robert Chen',
                hospitalName: 'City Cardiac Center',
                diagnosis: 'Routine Hypertension Check',
                prescription: 'Amlodipine 5mg once daily',
                notes: 'BP stabilized at 125/82. Continue current medication.',
                recordType: 'General Checkup'
            },
            {
                patientId: user._id,
                date: new Date('2026-04-10'),
                doctorName: 'Dr. Elena Rodriguez',
                hospitalName: 'Metropolis Lab',
                diagnosis: 'Annual Blood Work',
                prescription: 'Vitamin D3 supplements (2000 IU)',
                notes: 'Slight deficiency in Vitamin D. All other parameters normal.',
                recordType: 'Lab Report'
            }
        ];

        await MedicalRecord.insertMany(records);
        console.log('Sample medical records added');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
