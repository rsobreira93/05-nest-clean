import { DomainEvents } from './../events/domain-events';
import { DomainEvent } from '../events/domain-event';
import { Entity } from './entity';

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _DomainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._DomainEvents;
  }

  protected addDomainEvents(domainEvents: DomainEvent): void {
    this._DomainEvents.push(domainEvents);
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents() {
    this._DomainEvents = [];
  }
}
