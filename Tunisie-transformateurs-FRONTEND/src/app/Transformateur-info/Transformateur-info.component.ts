import { Component,OnInit } from '@angular/core';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { Transformateur } from '../Shared/Transformateur-service.model';
import { PvServiceService } from '../Shared/Pv-service.service';
import { Pv } from '../Shared/Pv-service.model';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { ConfirmationService, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SessionService } from '../utils/session-service.service';
import { EventServiceService } from '../Shared/Event-service.service';
import { Event } from '../Shared/Event-service.model'
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-Transformateur-info',
  templateUrl: './Transformateur-info.component.html',
  styleUrls: ['./Transformateur-info.component.css'],

})
export class TransformateurInfoComponent implements OnInit {

  rows: number = 10; // Number of rows per page
  first : number = 0;
  totalRecords: number = 0;
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
    public ServiceS : SessionService,
    public EventService : EventServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.service.refreshList2().subscribe({
      next: (res: Transformateur[]) => {
        this.list = res;
        this.totalRecords=this.list.length;
        this.paginate(); // Paginate data after fetching
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

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginate(); // Paginate data when page changes
  }
  paginate() {
    const start = this.first;
    const end = start + this.rows;

    // Check if there's a search query
    if (this.searchItem.trim()) {
      // If search query exists, paginate the search results
      const slicedSearchResults = this.list.slice(start, end);
      this.updatePvData(slicedSearchResults);
      this.list = slicedSearchResults;
    } else {
      // If no search query, paginate the original list
      this.service.refreshList2().subscribe({
        next: (res: Transformateur[]) => {
          const slicedData = res.slice(start, end);
          this.updatePvData(slicedData);
          this.list = slicedData;
        },
        error: (err) => {
          console.error('Error fetching Transformateur:', err);
        }
      });
    }
  }

  updatePvData(data: Transformateur[]) {
    data.forEach((transformateur, index) => {
      this.ServicePv.getPvByTransformerId(transformateur.numero).subscribe({
        next: (response: Pv[]) => {
          if (response.length > 0) {
            data[index].pv = response[0];
            if (data[index].pv?.idC) {
              const currentIndex = index as number;
              this.ServiceC.getControleurById(data[currentIndex].pv!.idC)
                .subscribe({
                  next: (result: ControleurDeQualite) => {
                    data[currentIndex].pv!.controleurDeQualite = result;
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
      const newEvent = new Event(this.ServiceS.Controleur.idC,'Supprimer un transformateur', new Date(),this.ServiceS.Controleur.username + ' a supprimer un transformateur '+ " avec le numéro " + id);
      this.EventService.AddEvent(newEvent)
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
                    // Recalculate nbAttente, nbConforme, and nbNonConforme
                    this.nbAttente = this.list.filter(transformateur => transformateur.pv?.resultat === 'En Attente').length;
                    this.nbConforme = this.list.filter(transformateur => transformateur.pv?.resultat === 'Conforme').length;
                    this.nbNonConforme = this.list.filter(transformateur => transformateur.pv?.resultat === 'Non Conforme').length;
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

items: any[] = [
  { label: 'Supprimer', icon: 'pi pi-trash', command: () => this.DeleteListOfTransformateurs() },
  { label: 'Exporter', icon: 'pi pi-file-pdf', command: () => this.exportListToExcel() }
];

save()
{
  this.router.navigate(['/Add_transformateur']);
}

DeletedTransformateurIds: number[] = [];

// Method to add the clicked transformateur's ID to DeletedTransformateurIds list
addToDeletedTransformateurs(transformateur: any) {
  const index = this.DeletedTransformateurIds.indexOf(transformateur.numero);
  if (index !== -1) {
    // If transformateur ID exists in the list, remove it
    this.DeletedTransformateurIds.splice(index, 1);
  } else {
    // If transformateur ID does not exist in the list, add it
    this.DeletedTransformateurIds.push(transformateur.numero);
  }

}

DeleteListOfTransformateurs() {
  // Call the deleteTransformateursList method and pass the array of transformateur IDs
  this.service.deleteTransformateursList(this.DeletedTransformateurIds)
    .subscribe(
      response => {
        // Handle success if needed
        console.log('Transformateurs deleted:', response);
        // Filter out the deleted transformateurs from the list
        this.list = this.list.filter(transformateur => !response.some(deletedTransformateur => deletedTransformateur.numero === transformateur.numero));
        this.nbAttente = this.list.filter(transformateur => transformateur.pv?.resultat === 'En Attente').length;
        this.nbConforme = this.list.filter(transformateur => transformateur.pv?.resultat === 'Conforme').length;
        this.nbNonConforme = this.list.filter(transformateur => transformateur.pv?.resultat === 'Non Conforme').length;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Transformateur supprimé avec succès' });

        // Create and add the event
        const firstTransformateurId = this.DeletedTransformateurIds.length > 0 ? this.DeletedTransformateurIds[0] : undefined;
        const lastTransformateurId = this.DeletedTransformateurIds.length > 0 ? this.DeletedTransformateurIds[this.DeletedTransformateurIds.length - 1] : undefined;

        const newEvent = new Event(
            this.ServiceS.Controleur.idC,
            'Supprimer un transformateur',
            new Date(),
            this.ServiceS.Controleur.username + ' a supprimé une liste de transformateurs entre ' + firstTransformateurId + ' et ' + lastTransformateurId
        );

        this.EventService.AddEvent(newEvent)
          .subscribe({
            next: (response) => {
              console.log('Event added successfully:', response);
              // Clear the DeletedTransformateurIds array after the event is added
              this.DeletedTransformateurIds = [];
              // Add any further logic here if needed
            },
            error: (error) => {
              console.error('Error adding event:', error);
              // Handle the error appropriately
            }
          });
      },
      error => {
        // Handle error if needed
        console.error('Error deleting transformateurs:', error);
      }
    );
}


exportListToExcel(): void {
  // Modify the list in place to remove properties with null values and format dates
  this.list.forEach((item: any) => {
    for (const key in item) {
      if (item.hasOwnProperty(key) && (item[key] === null || item[key] === "")) {
        delete item[key];
      }
    }

    // Format date properties to display only day, month, and year
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key) && key.startsWith('date')) {
        const dateValue = new Date(item[key]);
        if (!isNaN(dateValue.getTime())) {
          item[key] = dateValue.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
      }
    }
  });

  // Create a new worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.list);

  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate Excel file and trigger download
  XLSX.writeFile(wb, 'transformateurs.xlsx');
}

navigateToEssai(type: string, numero: number): void {
  const route = type === 'Monophasés' ? '/Essai_Transformateur_Mono' : '/Essai_Transformateur';
  this.router.navigate([route, numero], { queryParams: { id: numero } });
}

}
