import { Injectable, HttpStatus } from '@nestjs/common';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { HandlerProvider } from '@src/common/decorators/handler-provider.decorator';
import { HandlerMethod } from '@src/common/decorators/handler-method.decorator';
import { TemplateService } from '@src/template/services/template.service';

@Injectable()
@HandlerProvider()
export class TemplateHandler {
  constructor(private templateService: TemplateService) {}

  @HandlerMethod('helloWorld')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async helloWorld(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const response = this.templateService.getHello();
    return {
      body: JSON.stringify(response),
      statusCode: HttpStatus.OK,
    };
  }
}
