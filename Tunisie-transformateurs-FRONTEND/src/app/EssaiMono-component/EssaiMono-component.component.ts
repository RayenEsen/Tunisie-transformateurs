import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Pv } from '../Shared/Pv-service.model';
import { PvServiceService } from '../Shared/Pv-service.service';
import { SessionService } from '../utils/session-service.service';
import { Event } from '../Shared/Event-service.model'
import { EventServiceService } from '../Shared/Event-service.service'
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-EssaiMono-component',
  templateUrl: './EssaiMono-component.component.html',
  styleUrls: ['./EssaiMono-component.component.css']
})
export class EssaiMonoComponentComponent implements OnInit {


  transformateurId: number = 0;
  currentDate: string = '';
  pv: Pv[] = [];

  constructor(
    public service: TransformateurServiceService,
    private route: ActivatedRoute,
    public pvService: PvServiceService,
    public ServiceS : SessionService,
    public eventService : EventServiceService,
    public ServiceM : MessageService,
  ) { }

  ngOnInit() {
    this.getCurrentDate();
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
        this.service.GetTransformateur(this.transformateurId);
      this.pvService.getPvByTransformerId(this.transformateurId).subscribe(
        (pvData: Pv[]) => {
          this.pv = pvData;
          console.log('Pv Data:', this.pv);
        },
        error => {
          console.error('Error fetching Pv data:', error);
        }
      );
    }
    );
  }

  getCurrentDate() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

    // Format the date as "DD/MM/YYYY"
    this.currentDate = today.toLocaleDateString('en-US', options);
  }


  savePvValues() {
    if (this.pv && this.pv.length > 0 && this.pv[0].id_pv !== undefined) {

      if(this.ServiceS.Controleur.designation==="Verificateur")
      {
        this.pv[0].technique=this.ServiceS.Controleur.username;
      }
      if(this.ServiceS.Controleur.designation==="Controleur")
      {
        this.pv[0].idC=this.ServiceS.Controleur.idC;
      }
      // Call a service method to update the Pv values on the server
      this.pvService.UpdatePv(this.pv[0].id_pv, this.pv[0]).subscribe(
        response => {
          console.log('Pv values updated successfully', response);
        // Creating and adding the event
        if(this.ServiceS.Controleur.designation==="Verificateur")
        {
          const newEvent = new Event(this.ServiceS.Controleur.idC, "Verifier le Teste d'un transformateur", new Date(),"Essai Numero "+this.pv[0].id_pv+" de transformateur "+this.pv[0].id_t+ " est verifier par "+this.ServiceS.Controleur.username);
          this.eventService.AddEvent(newEvent)
            .subscribe({
              next: (response) => {
                console.log('Event added successfully:', response);
                // Add any further logic here if needed
              },
              error: (error) => {
                console.error('Error adding event:', error);
                // Handle the error appropriately
              }
            });
        }
        else
        {
          const newEvent = new Event(this.ServiceS.Controleur.idC, 'Tester un transformateur', new Date(),"Essai Numero "+this.pv[0].id_pv+" de transformateur "+this.pv[0].id_t+ " est tester par "+this.ServiceS.Controleur.username);
          this.eventService.AddEvent(newEvent)
            .subscribe({
              next: (response) => {
                console.log('Event added successfully:', response);
                // Add any further logic here if needed
              },
              error: (error) => {
                console.error('Error adding event:', error);
                // Handle the error appropriately
              }
            });
        }
          // Redirect the user to the specified page
          this.ServiceM.add({ severity: 'success', summary: 'Succès', detail: 'Les informations de Pv sont sauvegardées' });
        },
        error => {
          console.error('Error updating Pv values', error);
        }
      );
    }
  }


  getIOPourcentageMesurees()
  {
    if(this.pv[0].iom)
    {
      return (this.pv[0].iom*100)/(this.service.list[0].bti2)
    }
    else return 0
  }



      // Function to handle the print action
      onPrint() {
        window.print();
      }


      @ViewChild('input16') input16!: ElementRef<HTMLInputElement>;

      focusInput16() {
          if (this.input16) {
              this.input16.nativeElement.focus();
          }
      }

}
