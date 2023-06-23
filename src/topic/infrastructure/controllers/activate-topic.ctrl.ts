import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';

@Controller('/api/topics/:topicId/activate')
export class ActivateTopicController {
  @Post()
  @UseGuards(JwtAuthGuard)
  activate() {
    return 'helooo';
  }
}
