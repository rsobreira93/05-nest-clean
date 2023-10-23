import { AnswerAttachment } from '@/core/entities/answer-attachment';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-ansert-attachment-mapper';

@Injectable()
export class PrismaAnswersAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answersAttachments = await this.prisma.attachment.findMany({
      where: {
        answerId,
      },
    });

    return answersAttachments.map(PrismaAnswerAttachmentMapper.toDomain);
  }
  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    });
  }
}
