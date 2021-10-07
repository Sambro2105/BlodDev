import isValidEmail from "./isValidEmail";
import isValidPhoneNumber from "./isValidPhoneNumber";

const validateRegistrationForm = (
	name: string,
	account: string,
	password: string,
) => {
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
		errors.push("Password must be at least 6 chars");
	}

	return errors;
};

export default validateRegistrationForm;
