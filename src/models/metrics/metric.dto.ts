import { IsEnum, IsNumber, IsUUID, IsDate, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum MetricType {
  DISTANCE = 'DISTANCE',
  TEMPERATURE = 'TEMPERATURE',
}

export enum MetricUnit {
  METER = 'METER',
  CENTIMETER = 'CENTIMETER',
  INCH = 'INCH',
  FEET = 'FEET',
  YARD = 'YARD',
  CELSIUS = 'C',
  FAHRENHEIT = 'F',
  KELVIN = 'K',
}


export class CreateMetricDTO {
  @IsUUID()
  userId: string;

  @IsEnum(MetricType)
  metricType: MetricType;

  @IsNumber()
  value: number;

  @IsEnum(MetricUnit, { each: true, message: 'Invalid unit for metric type' })
  unit: MetricUnit;

  @IsDate()
  @Type(() => Date)
  dateRecord: Date;
}

export class GetAllMetricsDTO {
  @IsEnum(MetricType)
  metricType: MetricType;

  @IsEnum(MetricUnit)
  @IsOptional()
  unitConversation: MetricUnit | null;
}

export class GetMetricShowDrawingChartDTO {
  @IsEnum(MetricType)
  metricType: MetricType;

  @IsEnum(MetricUnit)
  @IsOptional()
  unitConversation: MetricUnit | null;

  @IsString()
  days: string;

  @IsString()
  @IsOptional()
  currentDate: Date | string;
}


