import IUser from "../IUser";

interface IRefreshTokenResponse {
	msg: string;
	access_token: string;
	user: IUser;
}

export default IRefreshTokenResponse;
