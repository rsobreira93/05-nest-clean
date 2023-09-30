import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository';
import { ReadNotificationUseCase } from './read-notification';
import { makeNotification } from 'test/factories/make-notification';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

let inMemoryNotificationsRepository: InMemoryNotificationRepository;
let sut: ReadNotificationUseCase;

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const notification = makeNotification();

    await inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification from another user', async () => {
    const newNotification = makeNotification(
      {
        recipientId: new UniqueEntityId('recipient-1'),
      },
      new UniqueEntityId('notification-1'),
    );

    await inMemoryNotificationsRepository.create(newNotification);

    const result = await sut.execute({
      recipientId: 'recipient-2',
      notificationId: 'notification-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
