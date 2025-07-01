import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentVariableConstants, RouteConstants, SwaggerConstants } from '@app/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const swaggerConfig = new DocumentBuilder()
  .setTitle(SwaggerConstants.API_TITLE)
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(RouteConstants.SWAGGER, app, document);

  await app.listen(configService.getOrThrow(EnvironmentVariableConstants.PORT));

  	logger.log(
		`Application built and listening on ${configService.getOrThrow(
			EnvironmentVariableConstants.BASE_URL,
		)}:${configService.getOrThrow(EnvironmentVariableConstants.PORT)}`,
	);
	logger.log(
		`Swagger built on ${configService.getOrThrow(EnvironmentVariableConstants.BASE_URL)}:${configService.getOrThrow(
			EnvironmentVariableConstants.PORT,
		)}/${RouteConstants.SWAGGER}`,
	);
}
bootstrap();
