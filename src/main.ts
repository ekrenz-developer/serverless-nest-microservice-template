import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import { Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';

interface MainHandlers {
  [handlerName: string]: Handler;
}

export const handler: Handler = async (event, context, callback) => {
  console.log('ACA event', event);
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const handlers: MainHandlers = {};

  const moduleRef = appContext.get<any>(ModulesContainer);
  const modules = [...moduleRef.values()];
  // console.log('ACA modules', modules);

  for (const module of modules) {
    const providers = [...module.providers.values()];
    // console.log('ACA providers', providers);
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

  const handler = handlers[event.handlerName];
  if (handler) {
    return handler(event, context, callback);
  } else {
    throw new Error(`Handler not found for '${event.handlerName}'.`);
  }
};
