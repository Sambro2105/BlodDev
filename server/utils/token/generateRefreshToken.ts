import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../../config";

const generateRefreshToken = (payload: object) => {
	return jwt.sign(payload, REFRESH_TOKEN_SECRET!, {
		expiresIn: "30d",
	});
};

export default generateRefreshToken;
