import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-students-repository';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository;
let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryStudentRepository: InMemoryStudentRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;

let sut: CommentOnQuestionUseCase;

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentRepository,
    );

    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository(
      inMemoryStudentRepository,
    );

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    );
  });

  it('should be able to comment on question', async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'comment test',
    });

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'comment test',
    );
  });
});
