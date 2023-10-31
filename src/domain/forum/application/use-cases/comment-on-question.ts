import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/question-repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resources-not-found-error';
import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionRepository,
    private questionCommentsRepository: QuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return right({
      questionComment,
    });
  }
}
