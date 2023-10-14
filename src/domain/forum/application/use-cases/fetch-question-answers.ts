import { Either, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';
import { Injectable } from '@nestjs/common';

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}
  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    );

    return right({
      answers,
    });
  }
}
