import { Injectable, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { RequestDto } from "../dto/request.dto";
import { DataSource, Repository } from "typeorm";
import { Request } from "../entity/request.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Capex } from "src/common/entity/capex/capex.entity";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly budReqRepo: Repository<Request>,
    private readonly dataSource: DataSource 
  ) {}

  async create(req: RequestDto): Promise<Request> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      
      const capex = await queryRunner.manager.findOne(Capex, {
        where: { id: req.capexId },
        lock: { mode: 'pessimistic_write' } 
      });

      if (!capex) {
        throw new BadRequestException('Capex not found');
      }

  

 
      const bud = queryRunner.manager.create(Request, {
        capex: { id: req.capexId },
        amount: String(req.req_amt),
        desc: req.desc,
        req_date: new Date(),
        user: { id: req.userId },
      });

      const savedRequest = await queryRunner.manager.save(bud);

  
      await queryRunner.manager.update(Capex, req.capexId, {
    
        reservedAmount: () => `reservedAmount + ${req.req_amt}`, 
        availableAmount: () => `availableAmount - ${req.req_amt}`
      });

  
      await queryRunner.commitTransaction();
      return savedRequest;

    } catch (error) {
   
      await queryRunner.rollbackTransaction();
      
   
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Transaction failed: ' + error.message);
      
    } finally {
 
      await queryRunner.release();
    }
  }
}