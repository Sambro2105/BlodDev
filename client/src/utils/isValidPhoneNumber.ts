function isValidPhoneNumber(phoneNumber: string) {
	const re = /^[+]/g;
	return re.test(phoneNumber);
}

export default isValidPhoneNumber;
