import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/core/entities/question-attachment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return questionAttachment;
}
