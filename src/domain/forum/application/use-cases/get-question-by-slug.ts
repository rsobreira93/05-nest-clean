import { Either, left, right } from '@/core/either';
import { QuestionRepository } from '../repositories/question-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resources-not-found-error';
import { Injectable } from '@nestjs/common';
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details';

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: QuestionDetails;
  }
>;

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlugWithDetails(slug);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    return right({
      question,
    });
  }
}
