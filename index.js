const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

admin.initializeApp();

// Initialize MailerSend with your Token
const mailerSend = new MailerSend({
    apiKey: "mlsn.e003fbb5e1f4acd621f2c799f75a1ea7ea8266e16785f8ab0516b893dbcc6948", // Paste your full API Token here
});

exports.sendOTP = functions.region('us-central1').https.onCall(async (data, context) => {
    const email = data.email;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 1. Save OTP to Firestore for verification later
    await admin.firestore().collection("temp_otps").doc(email).set({
        otp: otp,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 2. Setup Email Parameters (Based on your snippet)
    const sentFrom = new Sender("test-xkjn41mwpop4z781.mlsender.net", "Financial Ledger");
    const recipients = [new Recipient(email, "Valued User")];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("Your Verification Code")
        .setHtml(`<strong>Your OTP is: ${otp}</strong><p>It expires in 5 minutes.</p>`)
        .setText(`Your OTP is: ${otp}. It expires in 5 minutes.`);

    try {
        // 3. Send the email
        await mailerSend.email.send(emailParams);
        return { success: true };
    } catch (error) {
        console.error("MailerSend Error:", error);
        return { success: false, error: error.message };
    }
});
