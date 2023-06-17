import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { DeleteTopicService } from 'src/topic/services/delete-topic.service';
import { TopicNotFoundException } from 'src/topic/services/exceptions/not-found.exception';
import { UserEntity } from 'src/user/domain/user.entity';

@Controller('/api/topics/:id')
export class DeleteTopicController {
  constructor(private readonly deleteTopicService: DeleteTopicService) {}

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteTopic(@Param('id') id: number, @Req() req: Request) {
    try {
      const { id: userId } = req.user as UserEntity;
      await this.deleteTopicService.ensureTopicOfUserExists(id, userId);
      await this.deleteTopicService.deleteTopic(id);

      return {
        message: 'topic_deleted',
      };
    } catch (err) {
      if (err instanceof TopicNotFoundException)
        throw new HttpException('topic_not_found', HttpStatus.NOT_FOUND);

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
