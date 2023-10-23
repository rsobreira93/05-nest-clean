import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UsePipes,
} from '@nestjs/common';

import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { QuestionPresenter } from '../presenters/question-presenters';

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  @UsePipes()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({ slug });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { question: QuestionPresenter.toHttp(result.value.question) };
  }
}
