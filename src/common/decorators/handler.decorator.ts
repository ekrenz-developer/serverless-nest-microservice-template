import { SetMetadata } from '@nestjs/common';

export const Handler = (handlerName: string): MethodDecorator => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    SetMetadata('handler', { handlerName })(target, propertyKey, descriptor);
  };
};
