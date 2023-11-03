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
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments';
import { CommentPresenter } from '../presenters/comment-presenters';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/questions/:questionId/comments')
export class FetchQuestionsCommentsController {
  constructor(private fetchQuestionsComments: FetchQuestionCommentsUseCase) {}

  @Get()
  @UsePipes()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionsComments.execute({
      page,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const questionsComments = result.value.questionsComments;

    return { comments: questionsComments.map(CommentPresenter.toHttp) };
  }
}
