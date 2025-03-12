require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend requests
app.use(bodyParser.json());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Use environment variable
        pass: process.env.PASSWORD // Use generated app password
    }
});

app.post('/send-email', async (req, res) => {
    try {
        const { to, subject, body } = req.body;

        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text: body
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!', response: info.response });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
