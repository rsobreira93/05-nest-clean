import { InMemoryStudentRepository } from 'test/repositories/in-memory-students-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository;
let inMemoryAnswersRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryStudentRepository: InMemoryStudentRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository();
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository(
      inMemoryStudentRepository,
    );

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    );
  });

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'comment test',
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'comment test',
    );
  });
});
