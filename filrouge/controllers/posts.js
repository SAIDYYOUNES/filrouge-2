
import { PostService } from "../services";

export class PostController {
	
	static async index(req , res ) {
		return res.status(200).json(await PostService.findAll());
	}
	
}
