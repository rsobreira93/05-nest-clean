import { Either, left, right } from '@/core/either';
import { QuestionRepository } from '../repositories/question-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resources-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface DeleteQuestionBySlugUseCaseRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionBySlugUseCaseRequest): Promise<DeleteQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.questionsRepository.delete(question);

    return right(null);
  }
}
