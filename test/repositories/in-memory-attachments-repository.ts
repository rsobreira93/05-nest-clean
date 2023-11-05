import { Attachment } from '@/core/entities/attachment';
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository';

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = [];

  async create(attachment: Attachment) {
    this.items.push(attachment);
  }
}
