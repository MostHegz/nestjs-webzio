import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ExceptionResponseDTO } from './dtos/exception.response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // TODO: USE INJECTED LOGGER
  private logger = new Logger(HttpExceptionFilter.name);

  constructor() {}

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
