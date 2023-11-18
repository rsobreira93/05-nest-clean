import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-students-repository';

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryStudentRepository: InMemoryStudentRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;

let sut: CreateQuestionUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentRepository,
    );

    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to create a new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'new question title',
      content: 'new question content',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.value?.question,
    );
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ]);
  });

  it('should persist attachments when create a new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'new question title',
      content: 'new question content',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(2);
    expect(inMemoryQuestionAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
      ]),
    );
  });
});
