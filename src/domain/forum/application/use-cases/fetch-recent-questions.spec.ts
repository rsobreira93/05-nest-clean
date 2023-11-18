import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-students-repository';

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryStudentRepository: InMemoryStudentRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;

let sut: FetchRecentQuestionsUseCase;

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentRepository,
    );

    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 3, 20) }),
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 3, 18) }),
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 3, 30) }),
    );

    const result = await sut.execute({
      page: 1,
    });

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 3, 30) }),
      expect.objectContaining({ createdAt: new Date(2023, 3, 20) }),
      expect.objectContaining({ createdAt: new Date(2023, 3, 18) }),
    ]);
  });

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion());
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.value?.questions).toHaveLength(2);
  });
});
