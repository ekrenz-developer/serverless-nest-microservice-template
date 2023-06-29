import { SetMetadata } from '@nestjs/common';
import { IS_HANDLER_PROVIDER } from '../consts/is-handler-provider.const';

export const HandlerProvider = (): ClassDecorator =>
  SetMetadata(IS_HANDLER_PROVIDER, true);
