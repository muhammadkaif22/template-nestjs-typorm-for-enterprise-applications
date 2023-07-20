import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './healthcheck.service';

@Controller('api/v1')
export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}

  @Get('ping')
  ping() {
    return this.healthCheckService.ping();
  }
}
