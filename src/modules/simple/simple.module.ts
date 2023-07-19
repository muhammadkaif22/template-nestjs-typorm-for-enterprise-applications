import { Module } from '@nestjs/common';
import { SimpleController } from './simple.controller';
import { SimpleService } from './simple.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Simple } from 'src/entities/sample.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Simple])],
  controllers: [SimpleController],
  providers: [SimpleService],
})
export class SimpleModule {}
