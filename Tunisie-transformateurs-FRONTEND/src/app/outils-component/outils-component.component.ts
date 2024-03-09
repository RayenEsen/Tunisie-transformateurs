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
  ep: number[] = Array(8).fill(0);
  Results: number[] = Array(8).fill(0);
  targetRatio: number = 1;
  combinations: number[][] = [];
  Ratio: number = 0;
  BestReele: number = 0;
  bestideele: number = 0;
  BestSum: number = 0;
  IncreaseChance : number = 0;
  constructor(public ServiceM: MessageService) {}

  ngOnInit() {

  }

  generateCombinations() {
    const seenCombinations: Set<string> = new Set();
    let attempts = 0;

    while (this.combinations.length < this.IncreaseChance && attempts < 100000) {
      const filteredChoices = this.Choices.filter(choice => choice < this.C4);
      const combination: number[] = [];

      while (combination.length < 8) {
        if (filteredChoices.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredChoices.length);
          const randomChoice = filteredChoices[randomIndex];
          combination.push(randomChoice);
          // Remove the chosen value from filteredChoices
          filteredChoices.splice(randomIndex, 1);
        } else {
          // If filteredChoices is empty, fill the remaining slots with 0
          combination.push(0);
        }
      }

      const combinationKey = combination.join(',');
      if (!seenCombinations.has(combinationKey)) {
        seenCombinations.add(combinationKey);
        this.combinations.push(combination);
      }

      attempts++;
    }
  }


  calculateEp(combination: number[]) {
    console.log("Combination inside the CalculateEP "+combination)
    let remainingC4 = this.C4 * this.C4;
    let cumulativeSum = 0; // Track the cumulative sum for ep calculations

    combination.forEach((number, index) => {
      const sqrt = Math.sqrt(remainingC4 - number * number);

      // No subtraction for the first element (index === 0)
      const epValue = index === 0 ? sqrt : sqrt - cumulativeSum;
      this.ep.push(epValue);
      cumulativeSum += epValue; // Update cumulative sum for subsequent elements
    });
  }

  findBestCombination() {
    let bestRatio = Infinity;
    let bestCombination: number[] = [];
    let bestEp: number[] = [];

    this.combinations.forEach((combination, index) => {
        // Reset ep array before calculating for each combination
        this.ep = [];

        this.calculateEp(combination);
        const REELE = combination.reduce((acc, val, index) => acc + val * this.ep[index], 0) / 100;

        const c4Squared = this.C4 * this.C4;
        const IDEELE = c4Squared * Math.PI / 400;

        if (IDEELE !== 0) {
            const ratio = REELE / IDEELE;
            console.log(`Combination ${index + 1}:`, combination);

            const ratioDifference = Math.abs(ratio - this.targetRatio);
            if (ratioDifference < Math.abs(bestRatio - this.targetRatio)) {
                bestRatio = ratio;
                this.BestReele = REELE;
                this.bestideele = IDEELE;
                bestCombination = combination;
                bestEp = [...this.ep]; // Store the ep for the best combination
                this.Results = bestCombination;
                this.Ratio = bestRatio;
            }
        } else {
            console.log("Error: IDEELE is 0");
        }
    });

    // Recalculate ep for the best combination
    this.calculateEp(bestCombination);
    this.ep=bestEp
    this.BestSum = this.ep.reduce((acc, val) => acc + val, 0);
    console.log("Best Combination:", bestCombination);
    console.log("Best Ratio:", bestRatio);
    console.log("Best ep", bestEp);
}


DoTheWorkMethod() {
  if (this.C4 < 50 || this.C4 > 240) {
    this.ServiceM.add({ severity: 'error', summary: 'Erreur', detail: 'La valeur de D Circuit doit être comprise entre 50 et 240' });
    this.C4 = 0;
  }
  else
  {
    this.generateCombinations()
    this.findBestCombination()
  }
}
  // Method to handle tab change event
  onTabChange(event: any) {
    this.activeItem = event.item; // Update the activeItem variable
  }

}
