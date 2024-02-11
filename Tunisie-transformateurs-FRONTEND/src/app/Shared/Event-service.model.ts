import { ControleurDeQualite } from '../Shared/Controlleur-service.model';

export class Event {
  ide!: number; // Auto-generated primary key
  idC!: string; // Foreign key
  eventname!: string;
  eventDate!: Date;
  controleurDeQualite?: ControleurDeQualite;

  constructor(
    idC: string,
    eventname: string,
    eventDate: Date,
  ) {
    this.idC = idC;
    this.eventname = eventname;
    this.eventDate = eventDate;
  }
}
