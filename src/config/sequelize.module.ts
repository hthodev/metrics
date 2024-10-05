import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './sequelize.config';
import { Sequelize } from 'sequelize-typescript';

let env;
switch (process.env.ENV) {
  case 'PRODUCTION': 
    env = 'production';
    break;
  default:
    env = 'sandbox'
    break;
}

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get(`database.${env}.host`),
        port: configService.get(`database.${env}.port`),
        username: configService.get(`database.${env}.user`),
        password: configService.get(`database.${env}.password`),
        database: configService.get(`database.${env}.database`),
        autoLoadModels: true,
        synchronize: true,
        ...(configService.get(`database.${env}.ssl.rejectUnauthorized`) 
        ?
          {
            dialectOptions: {
              ssl: {
                rejectUnauthorized: true,
                ca: configService.get(`database.${env}.ssl.rejectUnauthorized`),
              },
            }
          }
        : {}
      )
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
  ],
  exports: ['SEQUELIZE'],
})
export class DatabaseModule {}
