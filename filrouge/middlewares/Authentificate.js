import jwt from "jsonwebtoken";
export const authentificate = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) return res.status(403).json("Unauthorized1");

	const token = authHeader.split(" ")[1];

	if (!token) return res.status(404).json("Unauthorized2");

	try {
			const decoded = jwt.verify(token, process.env.SECRET_KEY);
			req.user = decoded;
			next();
		
	} catch (err) {
		return res.status(401).json(err);
	}
	// next();
};
