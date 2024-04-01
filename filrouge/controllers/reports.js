import { ReportService } from "../services";
export class ReportController {
    static async index(req, res) {
        return res.status(200).json(await ReportService.findAll());
    }
    static async create(req, res) {
        return res.status(201).json(await ReportService.create(req.params.id,req.body));
    }
    static async markRead(req, res) {
        return res.status(200).json(await ReportService.markRead(req.params.id));
    }
}