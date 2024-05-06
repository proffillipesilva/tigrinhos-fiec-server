importScripts("https://cdnjs.cloudflare.com/ajax/libs/firebase/10.11.1/firebase-app-compat.min.js");
importScripts("https://cdnjs.cloudflare.com/ajax/libs/firebase/10.11.1/firebase-messaging-compat.min.js");
const firebaseConfig = {
  apiKey: "",
  authDomain: "tigrinhos-fiec.firebaseapp.com",
  projectId: "tigrinhos-fiec",
  storageBucket: "tigrinhos-fiec.appspot.com",
  messagingSenderId: "",
  appId: ""
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage (function(payload) {
    console.log(payload);
    const notification = JSON.parse(payload);
    const notificationOption = {
        body: notification.body,
        icon: notification.icon
    };
    return self.registration.showNotification(payload.notification.title, notificationOption);
});