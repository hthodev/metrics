import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Metric } from './metric.model';
import { CreateMetricDTO, MetricType, MetricUnit } from './metric.dto';
import { QueryTypes } from 'sequelize';
import { User } from '../users/user.model';

@Injectable()
export class MetricService {
  constructor(
    @InjectModel(Metric)
    private readonly metricModel: typeof Metric,
  ) {}

  @InjectModel(User) private readonly userModel: typeof User;

  @Inject('SEQUELIZE') private readonly sequelize: Sequelize;
  async newMetric(body: CreateMetricDTO) {
    const user = await this.userModel.findOne({
      where: { id: body.userId },
      raw: true,
      useMaster: false,
      attributes: ['id'],
    });
    if (!user) throw new BadRequestException('user not found');
    return this.sequelize.transaction(async (transaction) => {
      return await this.metricModel.create(
        {
          userId: body.userId,
          metricType: body.metricType,
          unit: body.unit,
          value: body.value,
          dateRecord: body.dateRecord,
        },
        { transaction },
      );
    });
  }

  async getOfAllListMetrics({
    metricType,
    unitConversation = null,
  }) {
    const { conversionJoin, conversionSelect } =
      this.buildConversionQuery(unitConversation);

    const query = `
      SELECT m.id, m."userId", m."metricType", m.value, m."dateRecord", 
        ${conversionSelect}
      FROM metrics m
      ${conversionJoin}
      WHERE m."metricType" = :metricType
    `;

    const metrics = await this.sequelize.query(query, {
      replacements: { metricType, unitConversation },
      type: QueryTypes.SELECT,
    });

    return metrics;
  }

  buildConversionQuery(unitConversation) {
    if (unitConversation) {
      const conversionJoin = `
        LEFT JOIN "metricConversations" mc 
          ON m."metricType"::text = mc."metricType"::text
          AND m.unit::text = mc."fromUnit"::text
          AND mc."toUnit" = :unitConversation
      `;
      const conversionSelect = `
        CASE 
          WHEN mc."conversationRate" IS NOT NULL THEN m.value * mc."conversationRate"
          ELSE m.value 
        END AS "convertedValue",
        COALESCE(mc."toUnit"::text, m.unit::text) AS unit
      `;
      return { conversionJoin, conversionSelect };
    } else {
      return {
        conversionJoin: '',
        conversionSelect: 'm.value AS "convertedValue", m.unit::text AS unit',
      };
    }
  }

  subtractDays(days: number, currentDate: string | Date) {
    currentDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() - days);
    return currentDate;
  }

  async getMetricShowDrawingChart({
    metricType,
    currentDate = new Date(),
    days,
    unitConversation = null,
  }: {
    metricType: MetricType;
    currentDate: Date | string;
    days: number;
    unitConversation?: MetricUnit;
  }) {
    const { formattedSubtractDate, formattedCurrentDate } = this.formatDates(
      days,
      currentDate,
    );
    const { conversionJoin, conversionSelect } =
      this.buildConversionQueryShowChart(unitConversation);

    const query = `
      SELECT m.*, 
        ${conversionSelect}
      FROM metrics m
      ${conversionJoin}
      WHERE m."metricType" = :metricType
        AND m."dateRecord" >= :startDate 
        AND m."dateRecord" <= :endDate
        AND m."createdAt" IN (
          SELECT MAX("createdAt")
          FROM metrics
          WHERE "metricType" = :metricType
          AND "dateRecord" >= :startDate 
          AND "dateRecord" <= :endDate
          GROUP BY DATE("dateRecord")
        )
      ORDER BY m."dateRecord";
    `;

    const metrics = await this.sequelize.query(query, {
      replacements: {
        metricType,
        unitConversation,
        startDate: formattedSubtractDate,
        endDate: formattedCurrentDate,
      },
      type: QueryTypes.SELECT,
    });

    return metrics;
  }

  formatDates(days, currentDate) {
    const subtractCurrentDate = this.subtractDays(days, currentDate);
    return {
      formattedSubtractDate: subtractCurrentDate.toISOString().split('T')[0],
      formattedCurrentDate: new Date(currentDate).toISOString().split('T')[0],
    };
  }

  buildConversionQueryShowChart(unitConversation) {
    if (unitConversation) {
      const conversionJoin = `
        LEFT JOIN "metricConversations" mc ON m."metricType"::text = mc."metricType"::text
          AND m.unit::text = mc."fromUnit"::text
          AND mc."toUnit" = :unitConversation
      `;
      const conversionSelect = `
        CASE 
          WHEN mc."conversationRate" IS NOT NULL THEN m.value * mc."conversationRate"
          ELSE m.value 
        END AS "convertedValue",
        COALESCE(mc."toUnit"::text, m.unit::text) AS unit
      `;
      return { conversionJoin, conversionSelect };
    }

    return {
      conversionJoin: '',
      conversionSelect: 'm.value AS "convertedValue", m.unit::text AS unit',
    };
  }
}
