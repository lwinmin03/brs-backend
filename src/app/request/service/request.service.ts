import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { RequestDto } from '../dto/request.dto';
import { DataSource, Repository } from 'typeorm';
import { BudRequest } from '../entity/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Capex } from 'src/common/entity/capex/capex.entity';
import { Project } from 'src/common/entity/project.entity';
import { User } from 'src/app/user/entity/user.entity';
import { getAllBudgetDto } from '../dto/response/budget.response';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(BudRequest)
    private readonly budReqRepo: Repository<BudRequest>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<any> {
    const requests = await this.dataSource
      .getRepository(BudRequest)
      .createQueryBuilder('request')
      .innerJoinAndSelect('request.capex', 'capex')
      .innerJoinAndSelect('request.user', 'user')
      .innerJoinAndSelect('capex.project', 'project')
      .getMany(); // <-- Use getMany() instead of getRawMany()

    console.log(requests);

    return requests;
  }

  async create(req: RequestDto): Promise<BudRequest> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const capex = await queryRunner.manager.findOne(Capex, {
        where: { id: req.capexId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!capex) {
        throw new BadRequestException('Capex not found');
      }

      const bud = queryRunner.manager.create(BudRequest, {
        capex: { id: req.capexId },
        amount: String(req.req_amt),
        desc: req.desc,
        req_date: new Date(),
        user: { id: req.userId },
      });

      const savedRequest = await queryRunner.manager.save(bud);

      await queryRunner.manager.update(Capex, req.capexId, {
        reservedAmount: () => `reservedAmount + ${req.req_amt}`,
        availableAmount: () => `availableAmount - ${req.req_amt}`,
      });

      await queryRunner.commitTransaction();
      return savedRequest;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'Transaction failed: ' + error.message,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
