import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './typeorm.config';
import * as Models from '@app/entities/models';

describe('TypeOrmConfig', () => {
  let configService: ConfigService;
  const models: any[] = [];
  for (const key in Models) {
    if (Models.hasOwnProperty(key)) {
      const model = Models[key];
      models.push(model);
    }
  }
  const configuration = {
    DB_HOST: 'testHost',
    DB_PORT: 3452,
    DB_USERNAME: 'testUsername',
    DB_PASSWORD: 'testPassword',
    DB_NAME: 'testDBName',
  };

  const expectedTypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'testHost',
    port: 3452,
    username: 'testUsername',
    password: 'testPassword',
    database: 'testDBName',
    entities: models,
    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
    synchronize: false,
  };

  beforeEach(() => {
    configService = createMock<ConfigService>({
      getOrThrow: (key: string) => {
        return configuration[key];
      },
    });
  });

  describe('typeOrmConfigAsync', () => {
    it('should return a TypeOrmModuleAsyncOptions with TypeOrmConfig.getTypeOrmConfig called in the factory', async () => {
      const config = typeOrmConfigAsync;

      const createdConfig = await config.useFactory!(configService);
      expect(createdConfig).toMatchObject(expectedTypeOrmConfig);
    });
  });
});
