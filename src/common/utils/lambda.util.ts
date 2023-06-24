// import { Injectable, Type } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import {
//   Callback,
//   Context,
//   Handler,
//   APIGatewayEvent,
//   APIGatewayProxyResult,
// } from 'aws-lambda';

// import { AppModule } from '@/app.module';
// import { TemplateService } from '@/template/services/template.service';

// type DefaultMethodType = (...args: any[]) => any;

// // export const handler: Handler = async (
// //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
// //   event: APIGatewayEvent
// //   // context: Context,
// //   // callback: Callback
// // ): Promise<APIGatewayProxyResult> => {
// //   const appContext = await NestFactory.createApplicationContext(AppModule);
// //   const templateService = appContext.get(TemplateService);
// //   const response = templateService.getHello();

// //   return {
// //     body: JSON.stringify(response),
// //     statusCode: HttpStatus.OK,
// //   };
// // };

// const handler = async <TMethod = any, TEvent = any>(
//   service: Type<any>,
//   method: TMethod
// ): Handler => {
//   try {
//     const appContext = await NestFactory.createApplicationContext(AppModule);
//     const serviceContext = appContext.get(service);
//     serviceContext['']
//     return async () => {};
//   } catch (e) {
//     throw e;
//   }
// };

// @Injectable()
// export class GeneralUtil {
//   private className = GeneralUtil.name;

//   handler<TMethod = DefaultMethodType, TEvent = any>(method: TMethod): Handler {
//     try {
//       return async () => {};
//     } catch (e) {
//       throw e;
//     }
//   }

//   // export const handler: Handler = async (
//   //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   //   event: APIGatewayEvent
//   //   // context: Context,
//   //   // callback: Callback
//   // ): Promise<APIGatewayProxyResult> => {
//   //   const appContext = await NestFactory.createApplicationContext(AppModule);
//   //   const templateService = appContext.get(TemplateService);
//   //   const response = templateService.getHello();

//   //   return {
//   //     body: JSON.stringify(response),
//   //     statusCode: HttpStatus.OK,
//   //   };
//   // };
// }
