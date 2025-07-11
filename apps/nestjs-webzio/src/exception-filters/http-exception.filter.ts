import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ExceptionResponseDTO } from './dtos/exception.response.dto';
import { CustomLogger } from '@app/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // TODO: ONLY RETURN STACK IN DEV ENVIRONMENT
    const responseBody = new ExceptionResponseDTO(
      exception.getStatus(),
      exception.message,
      exception.stack || '',
    );

    this.logger.log(
      `Axios error occurred : ${exception.message} 
      \n status code: ${exception.getStatus()}
      and stack trace: ${exception.stack}`,
    );
    response.status(exception.getStatus()).json(responseBody);
  }
}
