import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';
import { ExceptionResponseDTO } from './dtos/exception.response.dto';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  // TODO: USE INJECTED LOGGER
  private logger = new Logger(AxiosExceptionFilter.name);

  constructor() {}

  catch(exception: AxiosError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // TODO: ONLY RETURN STACK IN DEV ENVIRONMENT
    const responseBody = new ExceptionResponseDTO(
      HttpStatus.BAD_REQUEST,
      exception.message,
      exception.stack || '',
    );

    // TODO: TOKEN WILL BE SHOWN IN THIS LOG
    this.logger.error(
      `Axios error occurred : ${exception.message} 
      \n status code: ${exception.response?.status}
      \n when requesting ${exception.request.host}/${exception.request.path} with method ${exception.request.method}.\n
      and stack trace: ${exception.stack}`,
    );
    response.status(HttpStatus.BAD_REQUEST).json(responseBody);
  }
}
