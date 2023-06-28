import { Module } from '@nestjs/common';

import { TemplateHandler } from './handlers/template.handler';
import { TemplateService } from './services/template.service';

@Module({
  providers: [TemplateHandler, TemplateService],
})
export class TemplateModule {}
