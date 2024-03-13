export const Admin = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).json("acces forbidden");
    next();
}