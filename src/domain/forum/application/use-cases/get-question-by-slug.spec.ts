import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-students-repository';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';
import { makeStudent } from 'test/factories/make-student';
import { makeAttachment } from 'test/factories/make-attachments';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryStudentRepository: InMemoryStudentRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository();
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentRepository,
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to get a  question by slug', async () => {
    const student = makeStudent({ name: 'John Doe' });

    await inMemoryStudentRepository.create(student);

    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
      authorId: student.id,
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const attachment = makeAttachment({
      title: 'attachment test',
    });

    await inMemoryAttachmentsRepository.create(attachment);

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: attachment.id,
      }),
    );

    const result = await sut.execute({
      slug: 'example-question',
    });

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
        author: 'John Doe',
        attachments: [
          expect.objectContaining({
            title: 'attachment test',
          }),
        ],
      }),
    });
  });
});
