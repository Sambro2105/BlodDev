import { OAuth2Client } from "google-auth-library";
import {
	MAIL_CLIENT_ID,
	MAIL_CLIENT_SECRET,
	MAIL_REFRESH_TOKEN,
	SENDER_MAIL_ADDRESS,
} from "../config";

const nodemailer = require("nodemailer");

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

// send mail
const sendMail = async (to: string, url: string, txt: string) => {
	const oAuth2Client = new OAuth2Client(
		MAIL_CLIENT_ID!,
		MAIL_CLIENT_SECRET!,
		OAUTH_PLAYGROUND,
	);

	oAuth2Client.setCredentials({ refresh_token: MAIL_REFRESH_TOKEN! });

	try {
		const access_token = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: SENDER_MAIL_ADDRESS!,
				clientId: MAIL_CLIENT_ID!,
				clientSecret: MAIL_CLIENT_SECRET!,
				refreshToken: MAIL_REFRESH_TOKEN!,
				access_token,
			},
		});

		const mailOptions = {
			from: SENDER_MAIL_ADDRESS!,
			to: to,
			subject: "BlogDev",
			html: `
              <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the BlogDev.</h2>
              <p>Congratulations! You're almost set to start using BlogDEV.
                  Just click the button below to validate your email address.
              </p>
              
              <a href="${url}" style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
          
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
              <div>${url}</div>
              </div>
            `,
		};

		return await transport.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};

export default sendMail;
