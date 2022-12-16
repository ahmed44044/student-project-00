import { roles } from "../../middleware/auth.js";

const endPoint={
    add:[roles.Admin],
    update:[roles.Admin]
}

export default endPoint