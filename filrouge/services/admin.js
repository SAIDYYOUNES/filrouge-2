import { User } from "../models";

export class AdminService {
    static async index() {
        return User.find({});
    }
    static async banne(id) {
        const user = User.findByIdAndUpdate(id, { banned: true }, { new: true });
        if (!user) throw new NotFound("User not found");
        return user;

    }
}