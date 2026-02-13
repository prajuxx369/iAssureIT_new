const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { body, validationResult } = require('express-validator');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

// TODO: Configure reCAPTCHA and rate limiting

// TODO: Configure nodemailer
const transporter = nodemailer.createTransport({
  //...
});

app.post('/submitLead', [
    body('name').not().isEmpty().trim().escape(),
    body('businessName').not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('mobile').isMobilePhone(),
    body('city').not().isEmpty().trim().escape(),
    body('country').not().isEmpty().trim().escape(),
    body('comments').trim().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, businessName, email, mobile, city, country, comments, sourcePage, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body;

    try {
        const leadRef = admin.firestore().collection('leads').doc();
        await leadRef.set({
            name,
            businessName,
            email,
            mobile,
            city,
            country,
            comments,
            sourcePage,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content,
            referrer: req.get('Referrer'),
            userAgent: req.get('User-Agent'),
            deviceType: 'unknown', // TODO: implement device detection
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: 'new',
            assignedTo: null
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'sales@iassureit.com',
            cc: 'info@iassureit.com',
            subject: `New Lead from ${businessName}`,
            text: `You have a new lead from ${name} at ${businessName}. 

Details: 
Name: ${name} 
Business Name: ${businessName} 
Email: ${email} 
Mobile: ${mobile} 
City: ${city} 
Country: ${country} 
Comments: ${comments}`
        };

        await transporter.sendMail(mailOptions);

        // TODO: Push to Zoho CRM via webhook

        res.status(200).send({ id: leadRef.id });

    } catch (error) {
        console.error('Error submitting lead:', error);
        res.status(500).send('Internal Server Error');
    }
});

exports.api = functions.https.onRequest(app);