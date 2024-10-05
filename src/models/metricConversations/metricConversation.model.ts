import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';
import { FLOAT } from 'sequelize';

@Table({
  tableName: 'metricConversations',
  timestamps: true,
})
export class MetricConversation extends Model<MetricConversation> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ENUM('DISTANCE', 'TEMPERATURE'),
    allowNull: false,
  })
  metricType: string;

  @Column({
    type: DataType.ENUM(
      'METER',
      'CENTIMETER',
      'INCH',
      'FEET',
      'YARD',
      'C',
      'F',
      'K',
    ),
    allowNull: false,
  })
  fromUnit: string;

  @Column({
    type: DataType.ENUM(
      'METER',
      'CENTIMETER',
      'INCH',
      'FEET',
      'YARD',
      'C',
      'F',
      'K',
    ),
    allowNull: false,
  })
  toUnit: string;

  @Column({
    type: FLOAT,
    allowNull: false,
  })
  conversationRate: number;
}
