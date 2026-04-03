importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
const firebaseConfig = {
            apiKey: "AIzaSyCxgScBxQ1habUoF4GRSgNeUgAiAoSxQY0",
            authDomain: "transaction-56206.firebaseapp.com",
            projectId: "transaction-56206",
            storageBucket: "transaction-56206.firebasestorage.app",
            messagingSenderId: "240740017957",
            appId: "1:240740017957:web:87b3932cfb204c4c7f9ccc",
            measurementId: "G-2BR60LS3QM"
        };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// This listener shows the notification when the browser tab is CLOSED
messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/2845/2845869.png' 
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
