import { Either, left, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resources-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { AnswerAttachment } from '@/core/entities/answer-attachment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list';
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository';

interface EditAnswerBySlugUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
  attachmentsIds: string[];
}

type EditAnswerBySlugUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswerRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerBySlugUseCaseRequest): Promise<EditAnswerBySlugUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    );

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      });
    });

    answerAttachmentList.update(answerAttachments);

    answer.attachments = answerAttachmentList;
    answer.content = content;

    await this.answersRepository.save(answer);

    return right({
      answer,
    });
  }
}
