import { Module } from '@nestjs/common';

import { TemplateHandler } from './handlers/template.handler';
import { TemplateService } from './services/template.service';
import { HandlerModule } from '@src/common/decorators/handler-module.decorator';

@HandlerModule()
@Module({
  providers: [TemplateHandler, TemplateService],
})
export class TemplateModule {}
