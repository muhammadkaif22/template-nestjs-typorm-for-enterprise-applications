import {
  Controller,
  Get,
  Param,
  // ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { SimpleService } from './simple.service';
import { CreateSimpleDto } from './dto/simple.dto';

@Controller('v1/simple')
export class SimpleController {
  constructor(private service: SimpleService) {}

  @Get()
  async get() {
    return await this.service.get();
  }

  @Get('/:id')
  // async getByID(@Param('id', ParseIntPipe) id: number) <- use this if you to formate the id into number
  async getByID(@Param('id') id: number) {
    return await this.service.getById(id);
  }

  @Post()
  async create(@Body() body: CreateSimpleDto) {
    return await this.service.create(body);
  }
}
