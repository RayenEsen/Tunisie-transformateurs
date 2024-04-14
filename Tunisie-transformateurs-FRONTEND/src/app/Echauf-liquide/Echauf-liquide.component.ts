import { Component, OnInit } from '@angular/core';
import { Liquide } from '../Shared/liquide-service.model';
import { LiquideServiceService } from '../Shared/liquide-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-Echauf-liquide',
  templateUrl: './Echauf-liquide.component.html',
  styleUrls: ['./Echauf-liquide.component.css']
})
export class EchaufLiquideComponent implements OnInit {

  List: Liquide[] = [];
  Lastone: Liquide[] = []; // Change the type to Liquide[], not Liquide
  transformateurId!: number;

  constructor(public router: ActivatedRoute, public ServiceL: LiquideServiceService, public ServiceM: MessageService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;
    });
    this.ServiceL.getLiquidesByTransformateur(this.transformateurId).subscribe({
      next: (response) => {
        if (response.length >= 18) {
          console.log(response)
          // Extract first 18 rows
          this.List = response.slice(0, 17);
          // Create a new array containing only the last item and assign to Lastone
          this.Lastone = [response[response.length - 1]];
        } else {
          // If response has less than 19 rows, assign an empty array to Lastone
          this.List = response;
          this.Lastone = [];
        }
      }
    });
  }

  update() {
    // Create a new array to hold the updated list
    const updatedList = [...this.List]; // Copy elements of this.List into a new array

    // Push the last element of Lastone onto the updatedList
    updatedList.push(this.Lastone[0]);

    // Pass updatedList to updateLiquides
    this.ServiceL.updateLiquides(updatedList).subscribe({
      next: (response) => {
        this.ServiceM.add({ severity: 'success', summary: 'Succès', detail: ' mis à jour avec succès' });
      }
    });
  }

  Calculate0(liquide : Liquide)
  {
    return (liquide.a1+liquide.a2+liquide.a3+liquide.a4)/4;
  }



  CalculateDelta(liquide : Liquide)
  {
    this.CalculateDeltaV2(liquide)
    return liquide.a0-this.Calculate0(liquide);
  }

  CalculateDeltaV2(liquide: Liquide) {
    // Find the index of the Liquide object in the array based on a specific property (assuming 'id' for example)
    const index = this.List.findIndex(item => item.btid === liquide.btid);

    // Calculate the average using Calculate0
    const average = this.Calculate0(liquide);

    if (isNaN(average)) {
      return 0;
    }

    // Calculate the delta
    const delta = liquide.a0 - average;

    // Update the 'resultat' property of the found Liquide object
    if (index !== -1) {
      this.List[index].resultat = delta;
    }

    return delta;
  }



  Conclusion()
  {
    return this.List[this.List.length - 1].a0 - this.Lastone[0].a0
  }

  CalculateDelta2(liquide: Liquide): number {
    const currentIndex = this.List.findIndex(item => item === liquide); // Find the index of current liquide in the list
    if (currentIndex === -1 || currentIndex === 0) {
        return 0; // If current liquide not found or it's the first one, return 0
    }
    const previousLiquide = this.List[currentIndex - 1]; // Get the previous liquide
    return this.CalculateDelta(liquide) - this.CalculateDelta(previousLiquide);
}


}
