const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCQPe-PqzDTDNwNzFVb5WaEX9JlsV-egx-uGvTdajqdiUJflmN_KGuqI9X6QLIkqCQ3NqytMl_nI8C_Djg-CUGY",
   "privateKey":"iA-DLAw7mUHhzAcYY4-wkkbJMxbjm75pe7wNJfB-Nfk"
};

webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": endpoint,
   "keys": {
      "p256dh": key_p256dh,
      "auth": key_auth
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '349228138764',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);