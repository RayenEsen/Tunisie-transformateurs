import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransformateurServiceService } from '../Shared/Transformateur-service.service';

@Component({
  selector: 'app-Essai-component',
  templateUrl: './Essai-component.component.html',
  styleUrls: ['./Essai-component.component.css']
})
export class EssaiComponentComponent implements OnInit {

  currentDate: string = '';
  transformateurId: number = 0;

  constructor(
    private route: ActivatedRoute,
    public service: TransformateurServiceService
  ) { }

  ngOnInit() {
    this.getCurrentDate();
    this.route.params.subscribe(params => {
      this.transformateurId = +params['id'] || 0;

      if (this.transformateurId) {
        this.service.GetTransformateur(this.transformateurId);
        console.log('Transformateur Data:', this.service.list);
      }
    });
  }

  getCurrentDate() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

    // Format the date as "DD/MM/YYYY"
    this.currentDate = today.toLocaleDateString('en-US', options);
  }

  // Function to handle the print action
  onPrint() {
    window.print();
  }
  getP3(MultiplyFactor: number): number {
    let result: number = 0;

    if (this.service.list[0].couplage.toUpperCase() === "MONO") {
      result = (this.service.list[0].mtu1 / this.service.list[0].btu2) * 1000;
    } else if (this.service.list[0].couplage.toUpperCase() === "YNYN") {
      result = (this.service.list[0].mtu1 / this.service.list[0].btu2) * 1000;
    } else if (this.service.list[0].couplage.toUpperCase() === "DYN") {
      result =( ( this.service.list[0].mtu1 / this.service.list[0].mtu2) * 1000 )* Math.sqrt(3);
    } else {
      result = ( ( (this.service.list[0].mtu1 / this.service.list[0].mtu2) * 1000 )* Math.sqrt(3) )/ 2;
    }

    result = result * MultiplyFactor;
    // Do not call toFixed here, so the result is a number
    return result;
  }
  getPI(MultiplyFactor : number)
  {
    return this.getP3(1)*MultiplyFactor;
  }
  getintervalle(MultiplyFactor: number,x : number){
    return this.getPI(x)*MultiplyFactor;
  }
}
