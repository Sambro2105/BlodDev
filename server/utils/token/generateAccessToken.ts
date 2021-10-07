import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../../config";

const generateAccessToken = (payload: object) => {
	return jwt.sign(payload, ACCESS_TOKEN_SECRET!, {
		expiresIn: "15m",
	});
};

export default generateAccessToken;
