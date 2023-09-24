import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from 'src/auth/current-user-decorator';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { userPayload } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestion {
  constructor(private prismaService: PrismaService, private jwt: JwtService) {}

  @Post()
  @UsePipes()
  async handle(@CurrentUser() user: userPayload) {
    return user;
  }
}
