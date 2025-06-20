const db = require('../db');
const nodemailer = require('nodemailer');

// Function to handle contact form submission
exports.submitContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save to database
    try {
        const [result] = await db.execute(
            'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]
        );

        // Send email notification
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, // Your email
            subject: `New Contact Form Submission: ${subject}`,
            text: `You have received a new message from ${name} (${email}):\n\n${message}`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact form data:', error);
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};