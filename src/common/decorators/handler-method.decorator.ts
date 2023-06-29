import { SetMetadata } from '@nestjs/common';
import { IS_HANDLER_METHOD } from '../consts/is-handler-method.const';

export const HandlerMethod = (handlerName: string): MethodDecorator => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    SetMetadata(IS_HANDLER_METHOD, { handlerName })(
      target,
      propertyKey,
      descriptor
    );
  };
};
