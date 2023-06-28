import { HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  Callback,
  Context,
  Handler,
  APIGatewayEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

import { AppModule } from '@src/app.module';
import { TemplateService } from '@src/template/services/template.service';

export const helloWorld: Handler = async (
  event: APIGatewayEvent
  // context: Context,
  // callback: Callback
): Promise<APIGatewayProxyResult> => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const service = appContext.get(TemplateService);
  const response = service.getHello();

  return {
    body: JSON.stringify(response),
    statusCode: HttpStatus.OK,
  };
};

export const byeWorld: Handler = async (
  event: APIGatewayEvent
  // context: Context,
  // callback: Callback
): Promise<APIGatewayProxyResult> => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const service = appContext.get(TemplateService);
  const response = service.getBye();

  return {
    body: JSON.stringify(response),
    statusCode: HttpStatus.OK,
  };
};
