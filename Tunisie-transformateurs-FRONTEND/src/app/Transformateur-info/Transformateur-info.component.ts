import { Component, OnInit } from '@angular/core';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { PvServiceService } from '../Shared/Pv-service.service';
import { Pv } from '../Shared/Pv-service.model';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';

@Component({
  selector: 'app-Transformateur-info',
  templateUrl: './Transformateur-info.component.html',
  styleUrls: ['./Transformateur-info.component.css']
})
export class TransformateurInfoComponent implements OnInit {

  PV: Pv = new Pv();
  list: Transformateur[] = [];
  nbAttente: number = 0;
  nbConforme: number = 0;
  nbNonConforme: number = 0;
  [index: string]: any;

  Controleur: ControleurDeQualite = new ControleurDeQualite();

  constructor(
    public service: TransformateurServiceService,
    public ServicePv: PvServiceService,
    public ServiceC: ControlleurServiceService
  ) { }

  ngOnInit() {
    this.service.refreshList();
    this.service.refreshList2().subscribe({
      next: (res: Transformateur[]) => {
        this.list = res;

        if (this.list.length > 0) {
          this.ServicePv.getPvByTransformerId(this.list[0].numero).subscribe({
            next: (response: Pv[]) => {
              if (response.length > 0) {
                this.PV = response[0];

                if (this.PV.id_C) {
                  this.ServiceC.getControleurById(this.PV.id_C)
                  .subscribe({
                    next: (result: ControleurDeQualite) => {
                      // Assuming the result is of type ControleurDeQualite
                      this.Controleur = result;
                    },
                    error: (error) => {
                      console.error('Error fetching data:', error);
                    }
                  });
                } else {
                  console.error('Error: this.PV.id_C is undefined.');
                }
              } else {
                console.error('Error: Empty result for Pv.');
              }
            },
            error: (err: any) => {
              console.error('Error fetching Pv:', err);
            }
          });
        } else {
          console.error('Error: this.list is empty.');
        }
      },
      error: (err) => {
        console.error('Error fetching Transformateur:', err);
      }
    });

    this.fetchPvsCountByResult("En Attente", 'nbAttente');
    this.fetchPvsCountByResult("Conforme", 'nbConforme');
    this.fetchPvsCountByResult("Non Conforme", 'nbNonConforme');
  }

  fetchPvsCountByResult(result: string, property: string) {
    this.ServicePv.getPvsCountByResult(result).subscribe({
      next: (response: number) => {
        this[property] = response;
        console.log(`Received response for ${result}:`, response);
      },
      error: (err) => {
        console.error(`Error fetching count for ${result}:`, err);
      }
    });
  }

  onDelete(id: number) {
    this.service.DeleteTransformateur(id).subscribe({
      next: (res: Transformateur[]) => {
        this.service.list = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
