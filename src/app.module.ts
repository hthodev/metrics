import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/sequelize.module';
import { MetricModule } from './models/metrics/metric.module';
import { MetricService } from './models/metrics/metric.service';
import { MetricController } from './models/metrics/metric.controller';

@Module({
  imports: [DatabaseModule, MetricModule],
  controllers: [MetricController],
  providers: [MetricService],
})
export class AppModule {}
