import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswersAttachmentsRepository } from './prisma/repositories/prisma-answers-attachments-repository';
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answers-comments-repository';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository';
import { PrismaQuestionsAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository';
import { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository';
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswersCommentRepository } from '@/domain/forum/application/repositories/answers-comments-repository';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository';
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository';
import { NotificationRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: QuestionRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswersAttachmentsRepository,
    },
    {
      provide: AnswersCommentRepository,
      useClass: PrismaAnswersCommentsRepository,
    },
    {
      provide: AnswerRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionsAttachmentsRepository,
    },
    {
      provide: QuestionCommentRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    AnswerAttachmentsRepository,
    AnswersCommentRepository,
    AnswerRepository,
    QuestionAttachmentsRepository,
    QuestionCommentRepository,
    QuestionRepository,
    StudentsRepository,
    AttachmentsRepository,
    NotificationRepository,
  ],
})
export class DatabaseModule {}
