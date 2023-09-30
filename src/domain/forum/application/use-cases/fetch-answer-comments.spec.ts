import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository;
let sut: FetchAnswerCommentsUseCase;

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    );

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    });

    expect(result.value?.answersComments).toHaveLength(3);
  });

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
        }),
      );
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    });

    expect(result.value?.answersComments).toHaveLength(2);
  });
});
