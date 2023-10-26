import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UsePipes,
} from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';

import { userPayload } from '@/infra/auth/jwt.strategy';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(private deleteQuestion: DeleteQuestionUseCase) {}

  @Delete()
  @HttpCode(204)
  @UsePipes()
  async handle(
    @CurrentUser() user: userPayload,
    @Param('id') questionId: string,
  ) {
    const { sub: authorId } = user;

    const result = await this.deleteQuestion.execute({
      authorId,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
