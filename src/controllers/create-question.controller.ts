import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { compare } from 'bcryptjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestion {
  constructor(private prismaService: PrismaService, private jwt: JwtService) {}

  @Post()
  @UsePipes()
  async handle() {
    return 'ok';
  }
}
