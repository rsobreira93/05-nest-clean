import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
} from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

import { z } from 'zod';
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers';
import { AnswerPresenter } from '../presenters/answer-presenters';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/questions/:questionId/answers')
export class FetchQuestionsAnswersController {
  constructor(private fetchQuestionsAnswers: FetchQuestionAnswersUseCase) {}

  @Get()
  @UsePipes()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionsAnswers.execute({
      page,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const answers = result.value.answers;

    return { answers: answers.map(AnswerPresenter.toHttp) };
  }
}
