import { Either, right } from '@/core/either';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswersCommentRepository } from '../repositories/answers-comments-repository';
import { Injectable } from '@nestjs/common';

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answersComments: AnswerComment[];
  }
>;

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswersCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answersComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return right({
      answersComments,
    });
  }
}
