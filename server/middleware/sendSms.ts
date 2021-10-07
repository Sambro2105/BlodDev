import twilio from "twilio";
import {
	TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN,
	TWILIO_PHONE_NUMBER,
} from "../config";

const client = twilio(TWILIO_ACCOUNT_SID!, TWILIO_AUTH_TOKEN!);

const sendSms = (to: string, body: string, txt: string) => {
	try {
		client.messages
			.create({
				body: `BlogDev ${txt} - ${body}`,
				from: TWILIO_PHONE_NUMBER!,
				to,
			})
			.then(message => {
				console.log(message.sid);
			});
	} catch (error) {
		console.log(error);
	}
};

export default sendSms;
