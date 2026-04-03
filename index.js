const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendNotification = functions.https.onRequest(async (req, res) => {

    const { title, body, userId } = req.body;

    const snapshot = await admin.firestore()
        .collection("users")
        .doc(userId)
        .collection("fcmTokens")
        .get();

    const tokens = snapshot.docs.map(doc => doc.id);

    if (tokens.length === 0) {
        return res.send("No tokens");
    }

    await admin.messaging().sendToDevice(tokens, {
        notification: { title, body }
    });

    res.send("Notification sent");
});
