import { ControleurDeQualite } from '../Shared/Controlleur-service.model';

export class Event {
  ide!: number; // Auto-generated primary key
  idC!: string; // Foreign key
  eventname!: string;
  eventDetails!: string;
  eventDate!: Date;
  controleurDeQualite?: ControleurDeQualite;

  constructor(
    idC: string,
    eventname: string,
    eventDate: Date,
    eventDetails : string
  ) {
    this.idC = idC;
    this.eventname = eventname;
    this.eventDetails = eventDetails;
    this.eventDate = eventDate;
  }
}
