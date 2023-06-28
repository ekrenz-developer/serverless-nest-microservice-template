import { Injectable, HttpStatus } from '@nestjs/common';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { Handler } from '@src/common/decorators/handler.decorator';
import { TemplateService } from '@src/template/services/template.service';

@Injectable()
export class TemplateHandler {
  constructor(private templateService: TemplateService) {}

  @Handler('helloWorld')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async helloWorld(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const response = this.templateService.getHello();
    return {
      body: JSON.stringify(response),
      statusCode: HttpStatus.OK,
    };
  }
}
