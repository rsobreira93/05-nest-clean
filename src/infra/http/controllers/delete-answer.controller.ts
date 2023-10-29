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
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer';

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: DeleteAnswerUseCase) {}

  @Delete()
  @HttpCode(204)
  @UsePipes()
  async handle(
    @CurrentUser() user: userPayload,
    @Param('id') answerId: string,
  ) {
    const { sub: authorId } = user;

    const result = await this.deleteAnswer.execute({
      authorId,
      answerId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
