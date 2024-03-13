
import { PostService } from "../services";

export class PostController {
	static async index(req , res ) {
		return res.status(200).json(await PostService.findAll());
	}


	static async create(req, res ) {
		return res.status(201).json(await PostService.create(req.body));
	}
	
}
