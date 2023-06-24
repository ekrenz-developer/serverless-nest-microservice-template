import { HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  Callback,
  Context,
  Handler,
  APIGatewayEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

import { AppModule } from '@/app.module';
import { TemplateService } from '@/template/services/template.service';

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
): Promise<APIGatewayProxyResult> => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const templateService = appContext.get(TemplateService);
  const response = templateService.getHello();

  return {
    body: JSON.stringify(response),
    statusCode: HttpStatus.OK,
  };
};
