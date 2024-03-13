
import { Comment, Post } from "../models";
import { Error } from "mongoose";
import { BadRequest, NotFound } from "http-errors";

export class CommentService {

	static async create(inputs) {
		try {
			const comment = await Comment.create(inputs);
			await Post.findOneAndUpdate(
				{ _id: comment.post.toString() },
				{ $push: { comments: comment._id.toString() } },
				{ new: true },
			);
			return comment;
		} catch (err) {
			if (err instanceof Error.ValidationError)
				throw new BadRequest(JSON.stringify(err));
			throw err;
		}
	}
	
	static async delete(id) {
		const comment = await Comment.findByIdAndDelete(id);
		if (!comment)
			throw new NotFound(JSON.stringify("cannot delete unfound comment "));
			await Post.findOneAndUpdate(
				{ _id: comment.post.toString() },
				{ $pull: { comments: comment._id.toString() } },
				{ new: true },
			);
			
			return comment;
	}
	static async like(id, like) {
		const comment = await Comment.findOne({ _id: id });
		if (!comment) throw new NotFound(JSON.stringify("comment not found"));

		if (comment.likes.includes(like)) {
			const comment = Comment.findOneAndUpdate(
				{ _id: id },
				{ $pull: { likes: like } },
				{ new: true },
			);

			return comment;
		} else {
			const comment = Comment.findOneAndUpdate(
				{ _id: id },
				{ $addToSet: { likes: like } },
				{ new: true },
			);

			return comment;
		}
	}
}
