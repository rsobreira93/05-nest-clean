import { RegisterStudentUseCase } from './register-student';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-students-repository';
import { FakeHasher } from 'test/cryptography/fake-hasher';

let inMemoryStudentRepository: InMemoryStudentRepository;
let fakeHasher: FakeHasher;

let sut: RegisterStudentUseCase;

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterStudentUseCase(inMemoryStudentRepository, fakeHasher);
  });

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'joh@mail.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      student: inMemoryStudentRepository.items[0],
    });
  });
  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'joh@mail.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryStudentRepository.items[0].password).toEqual(
      '123456-hashed',
    );
  });
});
