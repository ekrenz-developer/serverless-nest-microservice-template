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

declare const module: any;

export const helloWorld: Handler = async (
  event: APIGatewayEvent
  // context: Context,
  // callback: Callback
): Promise<APIGatewayProxyResult> => {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => appContext.close());
  }

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

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => appContext.close());
  }

  const service = appContext.get(TemplateService);
  const response = service.getBye();

  return {
    body: JSON.stringify(response),
    statusCode: HttpStatus.OK,
  };
};
