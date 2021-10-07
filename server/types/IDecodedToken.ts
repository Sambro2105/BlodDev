import INewUser from "./INewUser";

interface IDecodedToken {
	id?: string;
	newUser?: INewUser;
	iat: number;
	exp: number;
}

export default IDecodedToken;
