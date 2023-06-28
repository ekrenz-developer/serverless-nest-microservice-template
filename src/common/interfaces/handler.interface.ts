import {
  APIGatewayEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import { HttpStatus } from '@nestjs/common';

// export interface HandlerInterface {
//   [key: string]: HandlerMethod;
// };
// export interface HandlerInterface<TEvent = unknown, TResponse = unknown> {
//   Record<string, Handler<TEvent, TResponse>>;
// }

export type HandlerType<TEvent = unknown, TResponse = unknown> = Record<string, Handler<TEvent, TResponse>>;
