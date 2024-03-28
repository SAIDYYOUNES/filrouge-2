
import { UserService } from "../../services";

export class UserController {
	static async saveDposts(req, res) {
		return res.status(200).json(await UserService.saveDposts(req.user));
	}
	static async login(req, res) {
		return res.status(200).json(await UserService.login(req.body));
	}
	static async register(req, res) {
		return res.status(201).json(await UserService.register(req.body));
	}
	static async savePost(req, res) {
		return res.status(200).json(await UserService.savePost(req.user, req.params.id));
	}

}
