import { SetMetadata } from '@nestjs/common';
import { IS_HANDLER_MODULE } from '../consts/is-handler-module.const';

export const HandlerModule = (): ClassDecorator =>
  SetMetadata(IS_HANDLER_MODULE, true);
