import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswersCommentRepository } from '@/domain/forum/application/repositories/answers-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAnswersCommentsRepository
  implements AnswersCommentRepository
{
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.');
  }
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.');
  }
  create(answersComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(answersComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
