import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { EnvironmentVariableConstants } from '@app/constants';

export default class TypeOrmConfig {
  static getTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
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
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
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
