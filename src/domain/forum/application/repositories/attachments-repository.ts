import { Attachment } from '@/core/entities/attachment';

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>;
}
