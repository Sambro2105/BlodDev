import { Document } from "mongoose";

interface IUser extends Document {
	name: string;
	account: string;
	password: string;
	avatar: string;
	role: string;
	type: string;
}

export default IUser;
