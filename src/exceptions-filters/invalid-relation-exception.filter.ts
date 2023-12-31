import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InvalidRelationError } from '../videos/errors/invalid-relation.error';

@Catch(InvalidRelationError)
export class InvalidRelationExceptionFilter extends BaseExceptionFilter {
  catch(exception: InvalidRelationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: exception.message,
    });
  }
}
