import { connection } from "mongoose";
import { connect } from "mongoose";

export const db= connection;

db.on("error", (err) => {
	console.error(err);
});
db.once("open", () => {
	console.info("Connected to MongoDB");
});
db.once("close", () => {
	console.info("Closed connection to MongoDB");
});

// ------Connect to MongoDB------
const { MONGODB_URI } = process.env;

(async () => {
	await connect(MONGODB_URI);
})();
