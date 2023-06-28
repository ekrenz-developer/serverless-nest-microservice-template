/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import { Handler } from 'aws-lambda';

import { AppModule } from './app.module';

// handlers
import { TemplateHandler } from './template/handlers';

const main: { [handler: string]: Handler } = {};

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);
  // TODO: obtener array de providers desde la instancia de nestjs. Ver si se puede usar dynamic providers o algo por el estilo
  const providers = [TemplateHandler];
  providers.forEach((provider) => {
    const handlerInstance = app.get(provider);
    const methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(handlerInstance)
    );
    methods.forEach((method) => {
      const handler = handlerInstance[method];
      if (typeof handler === 'function') {
        // exports[handler] = handler.bind(handlerInstance);
        main[method] = handler.bind(handlerInstance);
      }
    });
  });
}

bootstrap();

export default main;
