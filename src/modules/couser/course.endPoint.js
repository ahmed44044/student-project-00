import { roles } from "../../middleware/auth.js";

export const endPoint={
    addCourse:[roles.User],
    admin:[roles.Admin],
    Forgiveness:[roles.Admin,roles.User]
}