import * as admin from 'firebase-admin';

declare global {
    namespace Express {
        interface Request {
            authUser?: admin.auth.DecodedIdToken; // Adding authUser to the Request
        }
    }
}
