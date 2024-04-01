import {Report} from '../models';
export class ReportService {
    static async findAll() {
        return await Report.find({}).populate('post');
    }
    static async create(id,data) {
        return await Report.create({post:id,
            ...data});
    }
   static async markRead(id) {
        return await Report.findByIdAndUpdate(id,{read:true},{new:true});
   }
}
