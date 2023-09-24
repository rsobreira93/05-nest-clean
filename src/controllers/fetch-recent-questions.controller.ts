import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';

import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prismaService: PrismaService, private jwt: JwtService) {}

  @Get()
  @UsePipes()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const questions = await this.prismaService.question.findMany({
      take: 1,
      skip: (page - 1) * 1,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { questions };
  }
}
