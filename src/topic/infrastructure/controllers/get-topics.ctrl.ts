import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { TopicDTO } from '../dtos/topic.dto';
import { TopicService } from 'src/topic/application/topic.service';

@Controller('/api/topics')
export class GetTopicsController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMyTopics(@Req() req) {
    const { id } = req.user;
    const topics = await this.topicService.getMyTopics(id);
    return TopicDTO.toResponseArray(topics);
  }
}
