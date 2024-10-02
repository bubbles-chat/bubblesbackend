import admin from 'firebase-admin'

export default function initializeFirebase() {
    const serviceAccount: admin.ServiceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}