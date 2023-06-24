import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { ReportingService } from 'src/reporting/services/reporting.service';
import { UserEntity } from 'src/user/domain/user.entity';

@Controller('/api/reports')
@UseGuards(JwtAuthGuard)
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('/totals-of-all-time')
  totals(@Req() req: Request) {
    const { id } = req.user as UserEntity;
    return this.reportingService.getTotalsOfUser(id);
  }
}
