import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-DashBoard-component',
  templateUrl: './DashBoard-component.component.html',
  styleUrls: ['./DashBoard-component.component.css']
})
export class DashBoardComponentComponent implements OnInit {

  constructor() { }
  data: any;
  date2: any;
  data5:any;
  data6:any;
  data7: any;
  data9: any;
  ngOnInit() {
    this.data = {
      labels: ['Category A', 'Category B', 'Category C', 'Category D'],
      datasets: [
        {
          data: [300, 200, 400, 150 ], // Example data for each category
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] // Example background colors for each category
        }
      ]
    };
    this.date2 = {
      "labels": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

      "datasets": [
        {
          "label": "Sales",
          "data": [65, 59, 80, 81, 56, 55, 40 , 65, 59, 80, 81, 56, 55, 40],
          "backgroundColor": "rgba(255, 99, 132, 0.2)",
          "borderColor": "rgba(255, 99, 132, 1)",
          "borderWidth": 1
        },
        {
          "label": "Expenses",
          "data": [28, 48, 40, 19, 86, 27, 90 , 10, 30, 11, 30, 25, 27, 60],
          "backgroundColor": "rgba(54, 162, 235, 0.2)",
          "borderColor": "rgba(54, 162, 235, 1)",
          "borderWidth": 1
        },
        {
          "label": "Repared",
          "data": [10, 30, 11, 30, 25, 27, 60 , 28, 48, 40, 19, 86, 27, 90],
          "backgroundColor": "rgba(54, 162, 235, 0.2)",
          "borderColor": "rgba(54, 162, 235, 1)",
          "borderWidth": 1
        }
      ]
    }
    this.data5 = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [65, 59, 80, 81, 56, 55, 40], // Example data points for Dataset 1
                fill: false, // Whether to fill the area under the line
                borderColor: 'rgb(75, 192, 192)', // Color of the line
                tension: 0.1 // How curvy the line is
            },
            {
                label: 'Dataset 2',
                data: [45, 55, 60, 70, 50, 40, 30], // Example data points for Dataset 2
                fill: false, // Whether to fill the area under the line
                borderColor: 'rgb(255, 99, 132)', // Color of the line
                tension: 0.1 // How curvy the line is
            }
        ]
    };
    this.data6 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
          {
              label: 'Sales 2023',
              data: [25000, 24500, 25500, 24000, 23500, 23000, 23500, 22500, 22000, 21500, 21000, 21500],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.4
          },
          {
              label: 'Sales 2024',
              data: [20000, 20500, 19500, 20200, 19800, 20500, 19800, 20200, 20500, 20800, 21000, 20500],
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.4
          }
      ]
  };

  this.data9 = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'My First Dataset',
            data: [65, 59, 90, 81, 56, 55, 40], // Example data points for the first dataset
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Background color of the area
            borderColor: 'rgba(255, 99, 132, 1)', // Border color of the area
            pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Background color of the points
            pointBorderColor: '#fff', // Border color of the points
            pointHoverBackgroundColor: '#fff', // Background color of the points when hovered
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)' // Border color of the points when hovered
        },
        {
            label: 'My Second Dataset',
            data: [28, 48, 40, 19, 96, 27, 100], // Example data points for the second dataset
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Background color of the area
            borderColor: 'rgba(54, 162, 235, 1)', // Border color of the area
            pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Background color of the points
            pointBorderColor: '#fff', // Border color of the points
            pointHoverBackgroundColor: '#fff', // Background color of the points when hovered
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)' // Border color of the points when hovered
        }
    ]
};


  }
}
