
import { CommentService } from "../services";

export class CommentController {


    static async create(req, res) {
        return res.status(201).json(await CommentService.create(req.body));
    }
    static async delete(req, res) {
        return res.status(200).json(await CommentService.delete(req.params.post));
    }
    static async like(req, res) {
        return res
            .status(200)
            .json(await CommentService.like(req.params.post, req.user._id));
    }
}
