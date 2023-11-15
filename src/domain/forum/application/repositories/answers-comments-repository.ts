import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';

export abstract class AnswersCommentRepository {
  abstract findById(id: string): Promise<AnswerComment | null>;
  abstract findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>;
  abstract findManyByAnswerIdWithAuthor(
    answerId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>;
  abstract create(answersComment: AnswerComment): Promise<void>;
  abstract delete(answersComment: AnswerComment): Promise<void>;
}
