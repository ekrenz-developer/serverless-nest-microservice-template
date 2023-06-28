/* eslint-disable @typescript-eslint/no-unused-vars */
// import { NestFactory } from '@nestjs/core';
// import { INestApplicationContext } from '@nestjs/common';
// import { Handler } from 'aws-lambda';

// import { AppModule } from './app.module';

// // handlers
// import { TemplateHandler } from './template/handlers';

// const main: { [handler: string]: Handler } = {};

// async function bootstrap(): Promise<void> {
//   const app = await NestFactory.createApplicationContext(AppModule);
//   // TODO: obtener array de providers desde la instancia de nestjs. Ver si se puede usar dynamic providers o algo por el estilo
//   const providers = [TemplateHandler];
//   providers.forEach((provider) => {
//     const handlerInstance = app.get(provider);
//     const methods = Object.getOwnPropertyNames(
//       Object.getPrototypeOf(handlerInstance)
//     );
//     methods.forEach((method) => {
//       const handler = handlerInstance[method];
//       if (typeof handler === 'function') {
//         // exports[handler] = handler.bind(handlerInstance);
//         main[method] = handler.bind(handlerInstance);
//       }
//     });
//   });
// }

// bootstrap();

// export default main;

import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';

import { AppModule } from './app.module';
import { TemplateHandler } from './template/handlers';

async function bootstrap(): Promise<void> {
  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(AppModule);
  const providers = [TemplateHandler];
  // const providers: HandlerType[] = []; // Agrega aquí tus handlers

  const handlers: { [handler: string]: Handler } = {};

  providers.forEach((provider) => {
    const handlerInstance = app.get(provider);
    const methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(handlerInstance)
    );

    methods.forEach((method) => {
      if (typeof handlerInstance[method] === 'function') {
        handlers[method] = handlerInstance[method].bind(handlerInstance);
      }
    });
  });

  Object.entries(handlers).forEach(([handlerName, handler]) => {
    exports[handlerName] = handler;
  });
}

bootstrap();
