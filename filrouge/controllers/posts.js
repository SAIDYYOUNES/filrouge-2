
import { PostService } from "../services";

export class PostController {
	static async index(req , res ) {
		return res.status(200).json(await PostService.findAll());
	}
	
	
	static async create(req, res ) {
		return res.status(201).json(await PostService.create(req.body));
	}
	static async delete(req , res ) {
		return res.status(200).json(await PostService.delete(req.params.post));
	}
	static async show(req , res ) {
		return res.status(200).json(await PostService.show(req.params.post));
	}
	
}
