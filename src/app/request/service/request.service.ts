import { Injectable } from "@nestjs/common";
import { RequestDto } from "../dto/request.dto";
import { Repository } from "typeorm";
import { Request } from "../entity/request.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RequestService{



    constructor(
        @InjectRepository(Request)
        private readonly budReqService:Repository<Request>
    ){}







async create(req:RequestDto) :Promise<any> {



 const newBud = this.budReqService.create({
        capex:{id: req.capexId},
        amount: String(req.req_amt),
        desc: req.desc,
        req_date: new Date(),     
        user: { id: req.userId },   
    });


    return await this.budReqService.save(newBud)



}







}