import { Component,OnInit } from '@angular/core';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { PvServiceService } from '../Shared/Pv-service.service';
import { Pv } from '../Shared/Pv-service.model';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { ConfirmationService, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-Transformateur-info',
  templateUrl: './Transformateur-info.component.html',
  styleUrls: ['./Transformateur-info.component.css'],

})
export class TransformateurInfoComponent implements OnInit {



  list: Transformateur[] = [];
  nbAttente: number = 0;
  nbConforme: number = 0;
  nbNonConforme: number = 0;
  searchItem: string = '';
  [index: string]: any;

  Controleur: ControleurDeQualite = new ControleurDeQualite();

  constructor(
    public service: TransformateurServiceService,
    public ServicePv: PvServiceService,
    public ServiceC: ControlleurServiceService,
    public ConfirmationService : ConfirmationService,
    public messageService: MessageService,
  ) { }

  ngOnInit() {
    this.service.refreshList2().subscribe({
      next: (res: Transformateur[]) => {
        this.list = res;
        console.log(this.list)
        if (this.list.length > 0) {
          // Iterate through each item in this.list
          this.list.forEach((transformateur, index) => {
            this.ServicePv.getPvByTransformerId(transformateur.numero).subscribe({
              next: (response: Pv[]) => {
                if (response.length > 0) {
                  // Assign the Pv to the current item in this.list
                  this.list[index].pv = response[0];

                  // Check if id_C is defined in Pv
                  if (this.list[index].pv?.idC) {
                    const currentIndex = index as number;  // Cast index to number
                    this.ServiceC.getControleurById(this.list[currentIndex].pv!.idC)
                      .subscribe({
                        next: (result: ControleurDeQualite) => {
                          // Assuming the result is of type ControleurDeQualite
                          // Assign the ControleurDeQualite to the current Pv
                          this.list[currentIndex].pv!.controleurDeQualite = result;
                        },
                        error: (error) => {
                          console.error('Error fetching data:', error);
                        }
                    });
                  } else {
                    console.error('Error: Pv.id_C is undefined.');
                  }
                } else {
                  console.error('Error: Empty result for Pv.');
                }
              },
              error: (err: any) => {
                console.error('Error fetching Pv:', err);
              }
            });
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



  Search() {
    console.log(this.searchItem);
    this.service.searchTransformateurs(this.searchItem).subscribe({
      next: (Response: Transformateur[]) => {
        console.log(Response);
        this.list = Response;

        // Iterate through each item in this.list
        this.list.forEach((transformateur, index) => {
          this.ServicePv.getPvByTransformerId(transformateur.numero).subscribe({
            next: (response: Pv[]) => {
              if (response.length > 0) {
                // Assign the Pv to the current item in this.list
                this.list[index].pv = response[0];

                // Check if id_C is defined in Pv
                if (this.list[index].pv?.idC) {
                  const currentIndex = index as number;  // Cast index to number
                  this.ServiceC.getControleurById(this.list[currentIndex].pv!.idC).subscribe({
                    next: (result: ControleurDeQualite) => {
                      // Assuming the result is of type ControleurDeQualite
                      // Assign the ControleurDeQualite to the current Pv
                      this.list[currentIndex].pv!.controleurDeQualite = result;
                      console.log(this.list[index])
                    },
                    error: (error) => {
                      console.error('Error fetching data:', error);
                    }
                  });
                } else {
                  console.error('Error: Pv.id_C is undefined.');
                }
              } else {
                console.error('Error: Empty result for Pv.');
              }
            },
            error: (err: any) => {
              console.error('Error fetching Pv:', err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error fetching Transformateur:', err);
      }
    });
  }


  fetchPvsCountByResult(result: string, property: string) {
    this.ServicePv.getPvsCountByResult(result).subscribe({
      next: (response: number) => {
        this[property] = response;
        console.log(`Received response for ${result}:`, response);
        // Call animateCounting after all properties are updated
      },
      error: (err) => {
        console.error(`Error fetching count for ${result}:`, err);
      }
    });
  }


  confirm1(id: number) {
    // Use the confirmation service to display a confirmation dialog
    this.ConfirmationService.confirm({
      message: 'Confirmer la suppression du transformateur?',
      header: 'Suppression',
      icon: 'pi pi-exclamation-triangle pi-lg',
      accept: () => {
            // Call the onDelete method to perform the deletion
            this.onDelete(id);
        },
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        reject: () => {
            // Logic to execute when the user cancels deletion
            console.log('Deletion cancelled');
            // You can put any action you want to perform upon cancellation here
        }

    });
}


onDelete(id: number) {
  this.service.DeleteTransformateur(id).subscribe({
    next: (res: Transformateur[]) => {
      console.log(res);
      this.list = res;

      // Recalculate nbAttente, nbConforme, and nbNonConforme
      this.nbAttente = this.list.filter(transformateur => transformateur.pv?.resultat === 'En Attente').length;
      this.nbConforme = this.list.filter(transformateur => transformateur.pv?.resultat === 'Conforme').length;
      this.nbNonConforme = this.list.filter(transformateur => transformateur.pv?.resultat === 'Non Conforme').length;

      // Iterate through each item in this.list
      this.list.forEach((transformateur, index) => {
        this.ServicePv.getPvByTransformerId(transformateur.numero).subscribe({
          next: (response: Pv[]) => {
            if (response.length > 0) {
              // Assign the Pv to the current item in this.list
              this.list[index].pv = response[0];

              // Check if id_C is defined in Pv
              if (this.list[index].pv?.idC) {
                const currentIndex = index as number;  // Cast index to number
                this.ServiceC.getControleurById(this.list[currentIndex].pv!.idC).subscribe({
                  next: (result: ControleurDeQualite) => {
                    // Assuming the result is of type ControleurDeQualite
                    // Assign the ControleurDeQualite to the current Pv
                    this.list[currentIndex].pv!.controleurDeQualite = result;
                    console.log(this.list[index]);
                  },
                  error: (error) => {
                    console.error('Error fetching data:', error);
                  }
                });
              } else {
                console.error('Error: Pv.id_C is undefined.');
              }
            } else {
              console.error('Error: Empty result for Pv.');
            }
          },
          error: (err: any) => {
            console.error('Error fetching Pv:', err);
          }
        });
      });

      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Transformateur supprimé avec succès' });
    },
    error: (err) => {
      console.log(err);
      this.messageService.add({ severity: 'warn', summary: 'Avertissement', detail: 'La suppression du transformateur a échoué' });
    }
  });
}



}
