
import { HttpError } from "http-errors";

export function handleErrors(err,req,res,next) {
	// --- Log Errors ---
	console.error(err.name);
	console.error(err.stack);
	// --- Set Headers ---
	res.setHeader("Content-Type", "application/json");
	// --- Handle Errors ---
	if (err instanceof HttpError) {
		const isJson = err.message.startsWith("{");
		return res
			.status(err.statusCode)
			.send(isJson ? err.message : JSON.stringify(err));
	}

	return res.status(500).send(JSON.stringify('error: Internal Server Error'));
}
