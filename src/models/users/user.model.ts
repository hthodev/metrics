import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';

  @Table({
    tableName: 'users',
    timestamps: true,
  })
  export class User extends Model<User> {
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    })
    id: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    firstName: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    lastName: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    email: string;
  }
