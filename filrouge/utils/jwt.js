import jwt from "jsonwebtoken";

export const generateJWT = function (user) {
	let payload = {
		...user,
	};
	return jwt.sign(payload, process.env.SECRET_KEY);
};
