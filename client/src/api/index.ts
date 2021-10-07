import axios, { AxiosResponse } from "axios";
import ILoginResponse from "../types/api/login/response";
import IRegisterResponse from "../types/api/register/response";
import IRegisterRequest from "../types/api/register/request";
import ILoginRequest from "../types/api/login/request";
import IActivateRequest from "../types/api/activate/request";
import IActivateResponse from "../types/api/activate/response";
import IRefreshTokenResponse from "../types/api/refresh_token/response";
import ILogoutResponse from "../types/api/logout/response";

class API {
	private connection = axios.create({
		baseURL: "http://127.0.0.1:5000/api/v1",
	});

	loginWithPassword(
		loginRequest: ILoginRequest,
	): Promise<AxiosResponse<ILoginResponse>> {
		return this.connection.post("/auth/login", loginRequest, {
			withCredentials: true,
		});
	}

	register(
		registerRequest: IRegisterRequest,
	): Promise<AxiosResponse<IRegisterResponse>> {
		return this.connection.post("/auth/register", registerRequest);
	}

	activate(
		activateRequest: IActivateRequest,
	): Promise<AxiosResponse<IActivateResponse>> {
		return this.connection.post("/auth/activate", activateRequest);
	}

	refresh_token(): Promise<AxiosResponse<IRefreshTokenResponse>> {
		return this.connection.get("/auth/refresh_token", {
			withCredentials: true,
		});
	}

	logout(): Promise<AxiosResponse<ILogoutResponse>> {
		return this.connection.get("/auth/logout", {
			withCredentials: true,
		});
	}
}

const api = new API();

export default api;
