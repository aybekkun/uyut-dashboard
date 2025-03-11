import { api } from "src/api"
import { LoginData, LoginForm, Profile } from "src/services/login/login.types"
import { ResponseSingleData } from "src/services/shared"

class LoginService {
	login = async (form: LoginForm): Promise<ResponseSingleData<LoginData>> => {
		const response = await api.post("/login", form)
		return response.data
	}

	profile = async (): Promise<ResponseSingleData<Profile>> => {
		const response = await api.get("/profile")
		return response.data
	}
}

export const loginService = new LoginService()
