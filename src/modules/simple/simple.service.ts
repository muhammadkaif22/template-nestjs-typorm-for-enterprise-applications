import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Simple } from 'src/entities/sample.entity';
import { Repository } from 'typeorm';
import { CreateSimpleDto } from './dto/simple.dto';

@Injectable()
export class SimpleService {
  constructor(
    @InjectRepository(Simple)
    private simpleRepo: Repository<Simple>,
  ) {}

  async get() {
    return this.simpleRepo.find({});
  }

  async getById(id: number) {
    return this.simpleRepo.findOne({ where: { id: id } });
  }

  async create(payload: CreateSimpleDto) {
    const simple = this.simpleRepo.create(payload);
    await this.simpleRepo.save(simple);
    return simple;
  }
}
