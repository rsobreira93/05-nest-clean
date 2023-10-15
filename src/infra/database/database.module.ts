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

@Module({
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
    PrismaAnswersAttachmentsRepository,
    PrismaAnswersCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionsAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
  exports: [
    PrismaService,
    PrismaAnswersAttachmentsRepository,
    PrismaAnswersCommentsRepository,
    PrismaAnswersRepository,
    PrismaQuestionsAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    QuestionRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
