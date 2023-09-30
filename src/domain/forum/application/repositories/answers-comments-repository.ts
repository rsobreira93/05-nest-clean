import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComment } from '../../enterprise/entities/answer-comment';

export interface AnswersCommentRepository {
  findById(id: string): Promise<AnswerComment | null>;
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>;
  create(answersComment: AnswerComment): Promise<void>;
  delete(answersComment: AnswerComment): Promise<void>;
}
