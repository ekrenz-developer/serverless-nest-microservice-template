import { NestFactory } from '@nestjs/core';
import { Handler } from 'aws-lambda';

import { AppModule } from './app.module';
import { getHandlers } from './common/utils/main.util';

export const handler: Handler = async (event, context, callback) => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const handlers = getHandlers(appContext);

  const handler = handlers[context.functionName];
  if (handler) {
    return handler(event, context, callback);
  } else {
    throw new Error(`Handler not found for '${event.handlerName}'.`);
  }
};
