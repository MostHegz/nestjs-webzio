import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ExceptionResponseDTO } from './dtos/exception.response.dto';
import { TypeORMError } from 'typeorm';
import { CustomLogger } from '@app/logger';

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(exception: TypeORMError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // TODO: ONLY RETURN STACK IN DEV ENVIRONMENT
    const responseBody = new ExceptionResponseDTO(
      HttpStatus.CONFLICT,
      exception.message,
      exception.stack || '',
    );

    this.logger.warn(
      `Typeorm error occurred : ${exception.message} 
      \n cause: ${exception.cause}
      and stack trace: ${exception.stack}`,
    );
    response.status(HttpStatus.CONFLICT).json(responseBody);
  }
}
