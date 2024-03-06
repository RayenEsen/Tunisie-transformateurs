import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-outils-component',
  templateUrl: './outils-component.component.html',
  styleUrls: ['./outils-component.component.css']
})
export class OutilsComponentComponent implements OnInit {

  items: any[] = [
    { label: 'Calcul Ratio', icon: 'pi pi-calculator', routerLink: ['/Outils'] }, // Wrench icon
    { label: 'Outil 2 ', icon: 'pi pi-wrench', routerLink: ['/Transformateur'] }, // Tool icon
    { label: 'Outil 3', icon: 'pi pi-wrench', routerLink: ['/Planification'] }, // Settings icon
    { label: 'Outil 4', icon: 'pi pi-wrench', routerLink: ['/Utilisateurs'] } // Cogs icon
  ];

  activeItem: any; // Define the activeItem variable
  C4: number = 0;
  Choices: number[] = [50, 70, 80, 90, 100, 110, 120, 130, 140, 150, 170, 190, 205, 220, 240];
  ep : number[] = []
  Results: number[] = []
  constructor(public ServiceM : MessageService) {}


    // Method to handle tab change event
    onTabChange(event: any) {
      this.activeItem = event.item; // Update the activeItem variable
    }

    InitialisePE()
    {
      console.log(this.ep)
      this.ep = []
    }

    CalculateEp(x: number) {
      // Calculate the result
      const result = Math.sqrt((this.C4 * this.C4) - (x * x)) - this.ep.reduce((acc, val) => acc + val, 0);

      // Push the result to the ep array
      if (!isNaN(result)) {
        this.ep.push(result);
      }
      return result;
    }

    CalculateReele() {
      return this.Results.slice(0, 8).reduce((acc, val, index) => acc + (val * this.ep[index]), 0) / 100;
    }

    CalculEdiale()
    {
      return  (this.C4 * this.C4 * Math.PI) / 400
    }

    Ratio() {
      return this.CalculateReele() / this.CalculEdiale();
    }


    Somme() {
        return this.ep.reduce((acc, curr) => acc + curr, 0);
    }


    epValues: number[] = [];

    populateResults() {
      if(this.C4>240 || this.C4<50)
      {
        this.ServiceM.add({ severity: 'error', summary: 'Error', detail: 'Le nombre doit être compris entre 50 et 240.' });
        return;
      }
      // Step 1: Filter numbers larger than C4
      const filteredChoices = this.Choices.filter(num => num < this.C4);

      // Step 2: Sort filtered numbers in descending order
      filteredChoices.sort((a, b) => b - a);

      // Step 3: Find the index of the first number smaller than C4
      const startIndex = filteredChoices.findIndex(num => num < this.C4);

      // Step 4: Take the first 9 unique numbers from the sorted array starting from the index found
      if (startIndex !== -1) {
        this.Results = filteredChoices.slice(startIndex, startIndex + 9);
      } else {
        this.Results = [];
      }

      // Step 5: If the number of results is less than 9, continue filling with choices or repeat 50
      while (this.Results.length < 8) {
        if (filteredChoices.length > 0) {
          const lastNumber = filteredChoices.pop(); // Remove the last number from the choices
          if (lastNumber !== undefined && lastNumber !== 50 && !this.Results.includes(lastNumber)) {
            this.Results.push(lastNumber); // Add it to the results if it's not 50 and not already in the results
          }
        } else {
          this.Results.push(50); // Repeat 50 if needed
        }
      }
      // Pre-calculate ep values
      this.epValues = this.Results.map(item => this.CalculateEp(item));
    }



  ngOnInit() {

  }

}
