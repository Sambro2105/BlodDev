import IRegisterRequest from "./request";

interface IRegisterDispatch extends IRegisterRequest {
	cf_password: string;
}

export default IRegisterDispatch;
