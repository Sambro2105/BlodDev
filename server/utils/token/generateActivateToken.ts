import jwt from "jsonwebtoken";
import { ACTIVATE_TOKEN_SECRET } from "../../config";

const generateActivateToken = (payload: object) => {
	return jwt.sign(payload, ACTIVATE_TOKEN_SECRET!, {
		expiresIn: "5m",
	});
};

export default generateActivateToken;
