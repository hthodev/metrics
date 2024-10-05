import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { MetricService } from './metric.service';
import {
  CreateMetricDTO,
  GetAllMetricsDTO,
  GetMetricShowDrawingChartDTO,
  MetricType,
  MetricUnit,
} from './metric.dto';

@Controller('metrics')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  checkValidMetricType(unit, metricType) {
    if (metricType === MetricType.DISTANCE) {
      if (
        ![
          MetricUnit.CENTIMETER,
          MetricUnit.FEET,
          MetricUnit.INCH,
          MetricUnit.METER,
          MetricUnit.YARD,
        ].includes(unit as any)
      ) {
        throw new BadRequestException('Invalid unit for metric type');
      }
    } else {
      if (
        ![
          MetricUnit.CELSIUS,
          MetricUnit.FAHRENHEIT,
          MetricUnit.KELVIN,
        ].includes(unit as any)
      ) {
        throw new BadRequestException('Invalid unit for metric type');
      }
    }
  }

  @Post('create-new-metric')
  async newMetric(@Body() body: CreateMetricDTO) {
    const { unit, metricType } = body;
    this.checkValidMetricType(unit, metricType);
    return await this.metricService.newMetric(body);
  }

  @Get('get-of-all-list-metrics')
  @HttpCode(200)
  async getOfAllListMetrics(@Query() query: GetAllMetricsDTO) {
    if (query.metricType && query.unitConversation) {
      this.checkValidMetricType(
        query.unitConversation,
        query.metricType,
      );
    }
    return await this.metricService.getOfAllListMetrics(query);
  }

  @Get('get-metric-show-draw-chart')
  async getMetricShowDrawingChart(
    @Query() query: GetMetricShowDrawingChartDTO,
  ) {
    const { days } = query;
    const queryParam = {
      ...query,
      days: Number(days),
    };
    if (!queryParam.days) throw new BadRequestException('days invalid');
    if (queryParam.metricType && queryParam.unitConversation) {
      this.checkValidMetricType(
        queryParam.unitConversation,
        queryParam.metricType,
      );
    }
    return await this.metricService.getMetricShowDrawingChart(queryParam);
  }
}
