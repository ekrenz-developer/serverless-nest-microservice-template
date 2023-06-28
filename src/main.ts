import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import { Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';

interface MainHandlers {
  [handlerName: string]: Handler;
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appContext = app as INestApplicationContext;

  const handlers: MainHandlers = {};

  const moduleRef = appContext.get<any>(ModulesContainer);
  const modules = [...moduleRef.values()];

  for (const module of modules) {
    const providers = [...module.providers.values()];
    for (const provider of providers) {
      const instance = appContext.get(provider.metatype);
      const providerMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(instance)
      );
      for (const method of providerMethods) {
        const isHandler = Reflect.getMetadata('handler', instance[method]);
        if (isHandler) {
          const handlerName = isHandler.handlerName;
          handlers[handlerName] = instance[method].bind(instance);
        }
      }
    }
  }

  module.exports = handlers;
}

bootstrap();
