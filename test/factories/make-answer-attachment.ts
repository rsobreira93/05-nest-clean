import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/core/entities/answer-attachment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return answerAttachment;
}
