import { AggregateRoot } from '../entities/aggregate-root';
import { UniqueEntityId } from '../entities/unique-entity-id';
import { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate //eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvents(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', async () => {
    const callBackSpy = vi.fn();

    // Subscribe cadastrado (ouvindo o evento de respostas criada)
    DomainEvents.register(callBackSpy, CustomAggregateCreated.name);

    // criando resposta sem salvar no banco
    const aggregate = CustomAggregate.create();

    // Garantindo que o evento foi criando, mas não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1);

    // Salvando no banco e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // O subscriber ouve o evento e faz o que precisa ser feito com os dados
    expect(callBackSpy).toHaveBeenCalled();
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
