import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';
import { EtapeServiceService } from '../Shared/Etape-service.service';
import { Etape } from '../Shared/Etape-servicemodel';
import { SessionService } from '../utils/session-service.service';
import { EventServiceService } from '../Shared/Event-service.service'
import { Event } from '../Shared/Event-service.model'
import { Conseption } from '../Shared/Conseption-service.model';
import { ConseptionServiceService } from '../Shared/Conseption-service.service';
import { ConseptionValues } from '../Shared/ConseptionValues-service.model';
import { ConseptionValuesServiceService } from '../Shared/ConseptionValues-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-Conseption-component',
  templateUrl: './Conseption-component.component.html',
  styleUrls: ['./Conseption-component.component.css']
})
export class ConseptionComponentComponent implements OnInit {

  etapenumero:number = 0;
  transformateurId: number = 0;
  conseption: Conseption[] = [];
  selectedFileData: File | null = null;
  etapeSelected: Etape = new Etape;

  constructor(
    public ServiceConseption: ConseptionServiceService,
    public ServiceConseptionValues : ConseptionValuesServiceService,
    public router: Router,
    private route: ActivatedRoute,
    public service: TransformateurServiceService,
    public ServiceE: EtapeServiceService,
    public ServiceS: SessionService,
    public eventService : EventServiceService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
      this.etapenumero = +params['etapenumero'] || 0;
      if (this.transformateurId) {
        this.ServiceConseption.getConseptionsByTransformateur(this.transformateurId)
          .subscribe(
            (result: Conseption[]) => {
              this.conseption = result;
              console.log(this.conseption);
            },
            error => {
              console.error('Error fetching Conseptions by Transformateur ID:', error);
            }
          );
          this.service.GetTransformateur(this.transformateurId);
          this.ServiceE.getEtapeByNumeroAndTransformateur(this.etapenumero,this.transformateurId)
          .subscribe(
            etape => {
              this.etapeSelected=etape;
              console.log(this.etapeSelected);
            },
            error => {
              // Handle any errors that occur during the HTTP request
              console.error('Error fetching etape:', error);
            }
          );
      }
    });
  }

  getSafeImage(imageData: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageData);
  }


  update() {
    if(this.ServiceS.Controleur.designation==="Controleur" && this.ServiceS.Controleur.username)
    {
      this.etapeSelected.controleur=this.ServiceS.Controleur.username;
    }
    if(this.ServiceS.Controleur.designation==="Verificateur" && this.ServiceS.Controleur.username)
    {
      this.etapeSelected.verificateur=this.ServiceS.Controleur.username;
    }
    this.ServiceConseption.updateConseptions(this.transformateurId, this.conseption).subscribe({
      next: (response) => {
        console.log(this.etapeSelected)
        this.ServiceE.UpdateEtape(this.transformateurId, this.etapenumero, this.etapeSelected).subscribe({
          next: (response) => {
              console.log('Etape updated successfully:', response);
              // Handle the response as needed
          },
          error: (error) => {
              console.error('Error updating etape:', error);
              // Handle the error appropriately
          }
      });
      },
      error: (error) => {
        console.error('Error updating Conseptions:', error); // Log the error
        // Handle error as needed
      }
    });
}

  // Method to trigger file input click event
  uploadFile(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0]; // Get the first selected file
    if (file) {
      // Store the selected file data
      this.selectedFileData = file;
      // Here you can implement additional logic if needed
      console.log('Selected file:', file);
    }
  }

  uploadFileAndUpdateConseption(conseptionId: number): void {
    // Trigger file selection
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Adjust the accepted file types if needed
    fileInput.onchange = (event) => {
      this.onFileSelected(event); // Call the existing onFileSelected method
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Read the file content as a binary data
        const reader = new FileReader();
        reader.onload = (e) => {
          // Get the binary data from the FileReader result
          const binaryData = reader.result as ArrayBuffer;

          // Find the target Conseption object in the array by its ID
          const targetConseption = this.conseption.find(c => c.idConseption === conseptionId);
          if (targetConseption) {
            // Assign the binary data to the image property of the target Conseption object
            targetConseption.image = binaryData;
            this.update()

            // Optionally, you can update other properties of the target Conseption object here

            console.log('Binary data assigned to Conseption:', targetConseption);
          } else {
            console.error('Conseption not found with ID:', conseptionId);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    };
    fileInput.click();
  }


  Conforme(id: number) {
    const targetConseption = this.conseption.find(c => c.idConseption === id);
    if (targetConseption) {
        let conformiter = 'En Attente'; // Default value
        for (const targetValue of targetConseption.conseptionValues || []) {
            if (!targetValue.mesuree || !targetValue.prevue || !targetConseption.quantity || !targetConseption.quantity2) {
                conformiter = 'En Attente';
                break; // Break the loop since 'En Attente' condition is met
            } else if (targetValue.mesuree === targetValue.prevue && targetConseption.quantity === targetConseption.quantity2) {
                conformiter = 'Yes';
            } else {
                conformiter = 'No';
                break; // Break the loop since 'No' condition is met
            }
        }
        targetConseption.conformiter = conformiter;
    } else {
        return;
    }
}


verif()
{

}

}

