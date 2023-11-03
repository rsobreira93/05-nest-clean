import { Either, right } from '@/core/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';
import { Injectable } from '@nestjs/common';

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionsComments: QuestionComment[];
  }
>;

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionsComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return right({
      questionsComments,
    });
  }
}
