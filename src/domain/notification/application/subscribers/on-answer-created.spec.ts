import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { OnAnswerCreated } from './on-answer-created';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository';
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification';
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository';
import { makeQuestion } from 'test/factories/make-question';
import { SpyInstance } from 'vitest';
import { waitFor } from 'test/utils/wait-for';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-students-repository';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let inMemoryStudentRepository: InMemoryStudentRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;

let sendNotificationUseCase: SendNotificationUseCase;

let sendNOtificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>;

describe('On answer Created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentRepository,
    );
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    );

    sendNOtificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

    new OnAnswerCreated(inMemoryQuestionRepository, sendNotificationUseCase);
  });

  it('should send a notification when an answer was created', async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    inMemoryQuestionRepository.create(question);
    inMemoryAnswerRepository.create(answer);

    await waitFor(() => {
      expect(sendNOtificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
