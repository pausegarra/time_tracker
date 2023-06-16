import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { GetTopicService } from 'src/topic/services/get-topics.service';
import { TopicDTO } from '../dtos/topic.dto';

@Controller('/api/topics')
export class GetTopicsController {
  constructor(private readonly getTopicService: GetTopicService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMyTopics(@Req() req) {
    const { id } = req.user;
    const topics = await this.getTopicService.getMyTopics(id);
    return TopicDTO.toResponseArray(topics);
  }
}
