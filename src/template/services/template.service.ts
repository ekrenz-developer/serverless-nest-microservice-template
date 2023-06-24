import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateService {
  getHello(): { data: string } {
    return { data: 'Hello world!' };
  }
  getBye(): { data: string } {
    return { data: 'Bye world!' };
  }
}
