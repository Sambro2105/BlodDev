import isValidPhoneNumber from "./isValidPhoneNumber";
import isValidEmail from "./isValidEmail";
import IRegisterDispatch from "../types/api/register/dispatch";

const validateRegistrationForm = (registerForm: IRegisterDispatch) => {
	const { name, account, password, cf_password } = registerForm;

	const errors = [];

	if (!name) {
		errors.push("Please add your name.");
	} else if (name.length > 20) {
		errors.push("Your name is up to 20 chars long.");
	}

	if (!account) {
		errors.push("Please add your email or phone number.");
	} else if (!isValidPhoneNumber(account) && !isValidEmail(account)) {
		errors.push("Email or phone number format is incorrect.");
	}

	if (password.length < 6) {
		errors.push("Password must be at least 6 chars.");
	} else if (password !== cf_password) {
		errors.push("Passwords do not match.");
	}

	return errors;
};

export default validateRegistrationForm;
