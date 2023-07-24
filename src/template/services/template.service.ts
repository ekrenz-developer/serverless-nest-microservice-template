import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateService {
  getHello(): { data: string } {
    return { data: 'Hello worldd!' };
  }
  getBye(): { data: string } {
    return { data: 'Bye worldd!' };
  }
}
