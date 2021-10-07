import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
	ACTIVATE_TOKEN_SECRET,
	CLIENT_BASE_URL,
	REFRESH_TOKEN_SECRET,
} from "../../../../../config";
import sendMail from "../../../../../middleware/sendMail";
import User from "../../../../../models/user";
import isValidEmail from "../../../../../utils/isValidEmail";
import isValidPhoneNumber from "../../../../../utils/isValidPhoneNumber";
import generateRefreshToken from "../../../../../utils/token/generateRefreshToken";
import generateActivateToken from "../../../../../utils/token/generateActivateToken";
import generateAccessToken from "../../../../../utils/token/generateAccessToken";
import IDecodedToken from "../../../../../types/IDecodedToken";
import { StatusCodes } from "http-status-codes";

const authHandlers = {
	register: async (req: Request, res: Response) => {
		try {
			const { name, account, password } = req.body;

			const user = await User.findOne({ account });
			if (user)
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: "Email or Phone number already exists." });

			const passwordHash = await bcrypt.hash(password, 12);

			const newUser = {
				name,
				account,
				password: passwordHash,
			};

			const activate_token = generateActivateToken({ newUser });

			const url = `${CLIENT_BASE_URL!}/activate/${activate_token}`;

			if (isValidEmail(account)) {
				await sendMail(account, url, "Verify your email address");
				return res.json({
					msg: "Success! Please check your email.",
				});
			} else if (isValidPhoneNumber(account)) {
				// sendSms(account, url, "Verify your phone number");
				return res.json({
					msg: "Success! Please check your sms.",
				});
			}
		} catch (error: any) {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ msg: error.message });
		}
	},
	activate: async (req: Request, res: Response) => {
		try {
			const { activate_token: activate_token } = req.body;

			const decoded = <IDecodedToken>(
				jwt.verify(activate_token, ACTIVATE_TOKEN_SECRET!)
			);

			const { newUser } = decoded;

			if (!newUser)
				return res
					.status(StatusCodes.UNAUTHORIZED)
					.json({ msg: "Invalid authentication." });

			const user = await User.findOne({ account: newUser.account });

			if (user) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: "Account already exists." });
			} else {
				const user = new User(newUser);

				await user.save().then(value => {
					return res.json({
						msg: "Account has been activated!",
						user: {
							...value.toObject(),
							password: undefined,
						},
					});
				});
			}
		} catch (error: any) {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ msg: error.message });
		}
	},
	login: async (req: Request, res: Response) => {
		try {
			const { account, password } = req.body;

			const user = await User.findOne({ account });

			if (!user) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: "This account does not exists." });
			}

			// if user exists
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch)
				return res
					.status(StatusCodes.UNAUTHORIZED)
					.json({ msg: "Password is incorrect." });

			const access_token = generateAccessToken({ id: user._id });
			const refresh_token = generateRefreshToken({ id: user._id });

			res.cookie("refresh_token", refresh_token, {
				httpOnly: true,
				path: "/api/v1/auth/refresh_token",
				maxAge: 30 * 42 * 60 * 60 * 1000, // 30 days
			});

			return res.json({
				msg: "Login successful.",
				access_token,
				user: {
					...user.toObject(),
					password: undefined,
				},
			});
		} catch (error: any) {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ msg: error.message });
		}
	},
	logout: async (req: Request, res: Response) => {
		try {
			res.clearCookie("refresh_token", { path: "/api/v1/auth/refresh_token" });
			return res.json({ msg: "Logout Successful." });
		} catch (error: any) {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ msg: error.message });
		}
	},
	refreshToken: async (req: Request, res: Response) => {
		try {
			const refresh_token = req.cookies.refresh_token;

			if (!refresh_token)
				return res
					.status(StatusCodes.UNAUTHORIZED)
					.json({ msg: "Please login first." });

			const decoded = <IDecodedToken>(
				jwt.verify(refresh_token, REFRESH_TOKEN_SECRET!)
			);
			if (!decoded)
				return res
					.status(StatusCodes.UNAUTHORIZED)
					.json({ msg: "Please login first." });

			const user = await User.findById(decoded.id).select("-password");
			if (!user)
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: "This account does not exist." });

			const access_token = generateAccessToken({ id: user._id });

			return res.json({
				msg: "Token refresh successful.",
				access_token,
				user: {
					...user.toObject(),
					password: undefined,
				},
			});
		} catch (error: any) {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ msg: error.message });
		}
	},
};

export default authHandlers;
