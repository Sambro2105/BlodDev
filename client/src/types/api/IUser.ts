import EUserRole from "../EUserRole";
import EUserType from "../EUserType";

interface IUser {
	_id: string;
	name: string;
	account: string;
	avatar: string;
	role: EUserRole;
	type: EUserType;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export default IUser;
