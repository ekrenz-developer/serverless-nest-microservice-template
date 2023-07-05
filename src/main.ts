// import 'reflect-metadata';
import { NestFactory, Reflector } from '@nestjs/core';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { Handler } from 'aws-lambda';

import { IS_HANDLER_MODULE } from './common/consts/is-handler-module.const';
import { IS_HANDLER_PROVIDER } from './common/consts/is-handler-provider.const';
import { IS_HANDLER_METHOD } from './common/consts/is-handler-method.const';
import { AppModule } from './app.module';

interface MainHandlers {
  [handlerName: string]: Handler;
}

export const handler: Handler = async (event, context, callback) => {
  // console.log('ACA event', event);
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const handlers: MainHandlers = {};

  const reflector = appContext.get(Reflector);
  const moduleRef = appContext.get<any>(ModulesContainer);
  const modules = [...moduleRef.values()];
  // console.log('ACA modules', modules);

  for (const module of modules) {
    const metatype = module?.metatype;
    if (!metatype) {
      continue;
    }
    const isHandlerModule = reflector.get(IS_HANDLER_MODULE, metatype);
    if (!isHandlerModule) {
      continue;
    }
    const providers = [...module.providers.values()];
    // console.log('ACA providers', providers);
    for (const provider of providers) {
      // console.log('ACA1', provider);
      const metatype = provider?.metatype;
      if (!metatype) {
        continue;
      }
      const isHandlerProvider = reflector.get(IS_HANDLER_PROVIDER, metatype);
      if (!isHandlerProvider) {
        continue;
      }
      const instance = appContext.get(metatype);
      const providerMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(instance)
      );

      console.log('ACA providerMethods', providerMethods);
      console.log('ACA instance', instance);
      for (const method of providerMethods) {
        const isHandlerMethod = reflector.get(
          IS_HANDLER_METHOD,
          instance[method]
        );
        if (!isHandlerMethod) {
          continue;
        }
        const handlerName = isHandlerMethod.handlerName;
        handlers[handlerName] = instance[method].bind(instance);
      }
    }
  }
  console.log('ACA handlers', handlers);

  console.log('ACA event', event);
  // TODO: ver como agregarle al event el handlerName o algo para identificarlo
  const handler = handlers[event.handlerName];
  if (handler) {
    return handler(event, context, callback);
  } else {
    throw new Error(`Handler not found for '${event.handlerName}'.`);
  }
};
