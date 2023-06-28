import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';

import { AppModule } from './app.module';
// import * as templateHandlers from './template/handler';
import { TemplateHandler } from './template/handlers';
import { HandlerType } from './common/interfaces/handler.interface';

async function bootstrap(): Promise<HandlerType> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const handler = app.get<any, HandlerType>(TemplateHandler);
  return handler;
}

// export async function handlers(event, context) {
//   const app = await bootstrap();
//   const appService = app.get(AppService);
//   await appService.doSomething(event);
// }

// export handler;

// function exportAll(module){
//   Object.keys(module).forEach(key => {
//     exports[key] = module[key]; //<--- dynamically export all module keys
//   });
// }

// //for test:
// const fs = require("fs")
// exports.fs=fs
// exportAll(fs)
