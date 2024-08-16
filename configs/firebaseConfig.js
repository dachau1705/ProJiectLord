const admin = require('firebase-admin');
const serviceAccount = require('../key/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://matx-storage.appspot.com' // Thay thế bằng storage bucket của bạn
});

const bucket = admin.storage().bucket();

module.exports = bucket;
