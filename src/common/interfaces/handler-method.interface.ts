import { Handler } from 'aws-lambda';

export interface HandlerMethodInterface {
  [handlerName: string]: Handler;
}
