import admin from "firebase-admin";

import serviceAccountKey from "../serviceAccountKey.json";

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
  });

const firestore = admin.firestore();

export default firestore;
