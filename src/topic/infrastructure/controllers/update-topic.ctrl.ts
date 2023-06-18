import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { TopicNotFoundException } from 'src/topic/services/exceptions/not-found.exception';
import { TopicService } from 'src/topic/services/topic.service';
import { UserEntity } from 'src/user/domain/user.entity';
import { UpdateTopicDTO } from '../dtos/update-topic.dto';

@Controller('/api/topics/:id')
export class UpdateTopicController {
  constructor(private readonly topicSerivce: TopicService) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateTopic(
    @Body() body: UpdateTopicDTO,
    @Req() req: Request,
    @Param('id') topicId: number,
  ) {
    try {
      const { id } = req.user as UserEntity;
      await this.topicSerivce.ensureTopicOfUserExists(topicId, id);
      await this.topicSerivce.updateTopic(topicId, body);

      return {
        message: 'topic_udated',
      };
    } catch (err) {
      if (err instanceof TopicNotFoundException)
        throw new HttpException('topic_not_found', HttpStatus.NOT_FOUND);

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
