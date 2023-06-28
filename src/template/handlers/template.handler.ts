import { NestFactory } from '@nestjs/core';
import { HttpStatus, Type } from '@nestjs/common';
import {
  Callback,
  Context,
  Handler,
  APIGatewayEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { Injectable } from '@nestjs/common';

import { TemplateService } from '@src/template/services/template.service';

@Injectable()
export class TemplateHandler {
  constructor(private templateService: TemplateService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async helloWorld(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const response = this.templateService.getHello();
    return {
      body: JSON.stringify(response),
      statusCode: HttpStatus.OK,
    };
  }
}
