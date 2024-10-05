import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Metric } from '../metrics/metric.model';
import { MetricConversation } from '../metricConversations/metricConversation.model';
import { User } from '../users/user.model';
import { MetricService } from './metric.service';
@Module({
  imports: [SequelizeModule.forFeature([User, Metric, MetricConversation])],
  providers: [
    MetricService,
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
  ],
  exports: ['SEQUELIZE', SequelizeModule, MetricService],
})
export class MetricModule { }
