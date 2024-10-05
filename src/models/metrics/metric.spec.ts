import { Test, TestingModule } from '@nestjs/testing';
import { MetricController } from './metric.controller';
import { MetricService } from './metric.service';
import { CreateMetricDTO, MetricType, MetricUnit } from './metric.dto';
import { BadRequestException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Metric } from './metric.model';

describe('Metric Module', () => {
  let metricController: MetricController;
  let metricService: MetricService;

  const mockMetricService = {
    newMetric: jest.fn(),
    getOfAllListMetrics: jest.fn(),
    getMetricShowDrawingChart: jest.fn(),
  };

  const mockMetricModel = {
    create: jest.fn(),
  };

  const mockSequelize = {
    transaction: jest
      .fn()
      .mockImplementation((callback) => callback(mockSequelize)),
    query: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricController],
      providers: [
        {
          provide: MetricService,
          useValue: mockMetricService,
        },
        {
          provide: 'SEQUELIZE',
          useValue: mockSequelize,
        },
        {
          provide: Metric,
          useValue: mockMetricModel,
        },
      ],
    }).compile();

    metricController = module.get<MetricController>(MetricController);
    metricService = module.get<MetricService>(MetricService);
  });

  describe('MetricController', () => {
    describe('newMetric', () => {
      it('should create a new metric and return it', async () => {
        const createMetricDTO: CreateMetricDTO = {
          userId: '1436f62c-4504-4763-8b84-7686a9aef5fa',
          metricType: MetricType.DISTANCE,
          unit: MetricUnit.METER,
          value: 10,
          dateRecord: new Date(),
        };
        jest
          .spyOn(mockMetricService, 'newMetric')
          .mockResolvedValue(createMetricDTO);

        const result = await metricController.newMetric(createMetricDTO);
        expect(result).toEqual(createMetricDTO);
        expect(mockMetricService.newMetric).toHaveBeenCalledWith(
          createMetricDTO,
        );
      });

      it('should throw BadRequestException for invalid unit', async () => {
        const createMetricDTO: any = {
          userId: '383d9266-3c35-4d55-9902-cc1ddbe8afaa',
          metricType: MetricType.DISTANCE,
          unit: 'INVALID_UNIT', // Invalid unit
          value: 10,
          dateRecord: new Date(),
        };

        await expect(
          metricController.newMetric(createMetricDTO),
        ).rejects.toThrow(BadRequestException);
      });
    });

    describe('getOfAllListMetrics', () => {
      it('should return metrics list', async () => {
        const query = {
          metricType: MetricType.DISTANCE,
          limit: '10',
          page: '0',
          unitConversation: null,
        };
        const metrics = [
          {
            id: '615af6b4-6c93-4d21-aae8-7226d4d9d4b9',
            userId: '1436f62c-4504-4763-8b84-7686a9aef5fa',
            metricType: MetricType.DISTANCE,
            value: 10,
          },
        ];
        jest
          .spyOn(mockMetricService, 'getOfAllListMetrics')
          .mockResolvedValue(metrics);

        const result = await metricController.getOfAllListMetrics(query);
        expect(result).toEqual(metrics);
        expect(mockMetricService.getOfAllListMetrics).toHaveBeenCalledWith({
          ...query,
          limit: 10,
          page: 0,
        });
      });

      it('should throw BadRequestException for invalid parameters', async () => {
        const query = {
          metricType: MetricType.DISTANCE,
          limit: '',
          page: '',
          unitConversation: null,
        };

        await expect(
          metricController.getOfAllListMetrics(query),
        ).rejects.toThrow(BadRequestException);
      });
    });

    describe('getMetricShowDrawingChart', () => {
      it('should return metrics for drawing chart', async () => {
        const query = {
          metricType: MetricType.DISTANCE,
          days: '7',
          currentDate: new Date(),
          unitConversation: null,
        };
        const metrics = [
          {
            id: '1b8a2a26-136b-4ea1-982b-1fb8b8ad4de8',
            userId: '1436f62c-4504-4763-8b84-7686a9aef5fa',
            metricType: MetricType.DISTANCE,
            value: 10,
          },
        ];
        jest
          .spyOn(mockMetricService, 'getMetricShowDrawingChart')
          .mockResolvedValue(metrics);

        const result = await metricController.getMetricShowDrawingChart(query);
        expect(result).toEqual(metrics);
        expect(
          mockMetricService.getMetricShowDrawingChart,
        ).toHaveBeenCalledWith({ ...query, days: 7 });
      });

      it('should throw BadRequestException for invalid days', async () => {
        const query = {
          metricType: MetricType.DISTANCE,
          days: '',
          unitConversation: null,
          currentDate: new Date(),
        };

        await expect(
          metricController.getMetricShowDrawingChart(query),
        ).rejects.toThrow(BadRequestException);
      });
    });
  });
});
