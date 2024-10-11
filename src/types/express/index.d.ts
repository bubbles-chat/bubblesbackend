import User from "../../models/User.model";

declare global {
    namespace Express {
        interface Request {
            authUser?: User; // Adding authUser to the Request
        }
    }
}
