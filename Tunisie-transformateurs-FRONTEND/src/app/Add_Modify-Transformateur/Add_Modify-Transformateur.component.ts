import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Add_Modify-Transformateur',
  templateUrl: './Add_Modify-Transformateur.component.html',
  styleUrls: ['./Add_Modify-Transformateur.component.css']
})
export class Add_ModifyTransformateurComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Function to handle image change
  changeImage() {
    // Trigger the file input click event using Angular template reference variable
    document.getElementById('fileInput')?.click();
  }

  // Function to handle file input change
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Update the image source
        const userImage = document.getElementById('userImage') as HTMLImageElement;
        userImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
