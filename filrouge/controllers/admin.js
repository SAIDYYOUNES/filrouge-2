import {AdminService} from '../services';
export class AdminController {
    static async index(req, res) {
        return res.status(200).json(await AdminService.index());
    }
    static async banne(req, res) {
        return res.status(201).json(await AdminService.banne(req.params.id));
    }
   
}