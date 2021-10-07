import IUser from "../IUser";

interface ILoginResponse {
	msg: string;
	access_token: string;
	user: IUser;
}

export default ILoginResponse;
