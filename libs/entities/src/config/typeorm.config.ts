import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { EnvironmentVariableConstants } from '@app/constants';
import * as Models from '@app/entities/models';

export default class TypeOrmConfig {
  static getTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    const models: any[] = [];
    for (const key in Models) {
      if (Models.hasOwnProperty(key)) {
        const model = Models[key];
        models.push(model);
      }
    }

    return {
      type: 'postgres',
      host: configService.getOrThrow(EnvironmentVariableConstants.DB_HOST),
      port: configService.getOrThrow(EnvironmentVariableConstants.DB_PORT),
      username: configService.getOrThrow(
        EnvironmentVariableConstants.DB_USERNAME,
      ),
      password: configService.getOrThrow(
        EnvironmentVariableConstants.DB_PASSWORD,
      ),
      database: configService.getOrThrow(EnvironmentVariableConstants.DB_NAME),
      entities: models,
      migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
      synchronize: false,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getTypeOrmConfig(configService),
  inject: [ConfigService],
};
