
import { PostService } from "../services";

export class PostController {
	static async index(req , res ) {
		return res.status(200).json(await PostService.findAll());
	}
	static async show(req , res ) {
		return res.status(200).json(await PostService.show(req.params.post));
	}
	static async update(req , res ) {
		return res
			.status(200)
			.json(await PostService.update(req.params.post, req.body));
	}

	static async create(req, res ) {
		return res.status(201).json(await PostService.create(req.body));
	}
	static async delete(req , res ) {
		return res.status(200).json(await PostService.delete(req.params.post));
	}
	static async like(req, res ) {
		return res
			.status(200)
			.json(await PostService.like(req.params.post, req.user._id));
	}
	static async search(req , res ) {
		return res.status(200).json(PostService.search(req.body));
	}
	static async tags(req , res ) {
		return res
			.status(200)
			.json(await PostService.popularTags());
	}
}
