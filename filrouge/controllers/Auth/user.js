
import { UserService } from "../../services";

export class UserController {
	static async login(req, res) {
		return res.status(200).json(await UserService.login(req.body));
	}
	static async register(req, res) {
		return res.status(201).json(await UserService.register(req.body));
	}
}
