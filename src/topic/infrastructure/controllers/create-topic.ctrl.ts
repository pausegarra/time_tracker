import { Controller, Post } from '@nestjs/common';
import { CreateTopicService } from 'src/topic/services/create-topic.service';

@Controller('/api/topics')
export class CreateTopicController {
  constructor(private readonly createTopicService: CreateTopicService) {}

  @Post()
  create() {
    return this.createTopicService.create();
  }
}
