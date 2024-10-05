import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table({
  tableName: 'metrics',
  timestamps: true,
})
export class Metric extends Model<Metric> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.ENUM('DISTANCE', 'TEMPERATURE'),
    allowNull: false,
  })
  metricType: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  value: number;

  @Column({
    type: DataType.ENUM('METER', 'CENTIMETER', 'INCH', 'FEET', 'YARD', 'C', 'F', 'K'),
    allowNull: false,
  })
  unit: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateRecord: Date;
}
