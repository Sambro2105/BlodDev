import { NextFunction, Request, Response } from "express";
import validateRegistrationForm from "../../../../../utils/validateRegistrationForm";
import { StatusCodes } from "http-status-codes";

export const validRegister = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { name, account, password } = req.body;

	const errors = validateRegistrationForm(name, account, password);

	if (errors.length > 0) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			msg: errors,
		});
	}

	next();
};
