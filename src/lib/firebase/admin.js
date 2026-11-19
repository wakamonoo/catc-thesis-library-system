import { cert, getApps, initializeApp } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

const apps = getApps();

const adminApp =
  apps.length > 0
    ? apps[0]
    : initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
            /\\n/g,
            "\n",
          ),
        }),
      });

const adminAuth = getAuth(adminApp);

export { adminApp, adminAuth };
export default adminAuth;
