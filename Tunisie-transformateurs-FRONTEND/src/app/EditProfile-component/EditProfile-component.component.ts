import { Component, OnInit } from '@angular/core';
import { ControlleurServiceService } from '../Shared/Controlleur-service.service';
import { ControleurDeQualite } from '../Shared/Controlleur-service.model';
import { SessionService } from '../utils/session-service.service';
import { Pfp } from '../Shared/pfp-service.model';
import { PfpServiceService } from '../Shared/pfp-service.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-EditProfile-component',
  templateUrl: './EditProfile-component.component.html',
  styleUrls: ['./EditProfile-component.component.css']
})
export class EditProfileComponentComponent implements OnInit {


  Controleur: ControleurDeQualite = new ControleurDeQualite;
  Confirm : string = '';
  selectedFile?: File ; // Track the selected profile picture file
  pfp: Pfp = new Pfp;
  defaultImageUrl = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
  imageData: string | undefined;
  imageData1: string | undefined;


  constructor(public ServiceC : ControlleurServiceService,public ServiceS : SessionService, public ServicePfp : PfpServiceService) { }

  ngOnInit() {
    this.ServiceC.getControleurById(this.ServiceS.Controleur.idC)
      .subscribe({
        next: (result: ControleurDeQualite) => {
          // Assuming the result is of type ControleurDeQualite
          this.Controleur = result;
          this.ServiceS.Controleur = this.Controleur;
          console.log(this.ServiceS.Controleur)

          // Fetch the image data
          this.ServicePfp.getPfp(this.Controleur.idC).subscribe(
            (response: HttpResponse<Blob | null>) => {
              // Check if the response body is not null
              if (response.body !== null) {
                // Extract the URL from the response
                const url = window.URL.createObjectURL(response.body);
                // Assign the URL to the imageData property
                this.imageData = url;
              } else {
                console.error('No image data returned.');
              }
            },
            (error) => {
              console.error('Error fetching pfp:', error);
            }
          );
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }

  ConfirmPassword(): boolean {
    return this.Confirm === this.Controleur.password;
  }

  Update() {
    if (this.ConfirmPassword()) {
      this.ServiceS.Controleur = this.Controleur;
      this.ServiceC.UpdateControleurById(this.Controleur.idC, this.Controleur)
        .subscribe({
          next: (response) => {
            // Handle the success response if needed
            console.log('Controleur updated successfully:', response);
            // Check if a file is selected
            if (this.selectedFile) {
              // Check if imageData is defined
              if (this.imageData) {
                // Call the service to update the profile picture
                this.ServicePfp.updatePfp(this.Controleur.idC, this.selectedFile)
                  .subscribe({
                    next: (pfpResponse) => {
                      // Handle the success response if needed
                      console.log('Profile picture updated successfully:', pfpResponse);
                      alert('Profile picture updated successfully');
                    },
                    error: (pfpError) => {
                      // Handle the error
                      console.error('Error updating profile picture:', pfpError);
                      alert('Failed to update profile picture');
                    }
                  });
              } else {
                // Call the service to upload the profile picture
                this.ServicePfp.uploadPfp(this.Controleur.idC, this.selectedFile)
                  .subscribe({
                    next: (pfpResponse) => {
                      // Handle the success response if needed
                      console.log('Profile picture uploaded successfully:', pfpResponse);
                      alert('Profile picture uploaded successfully');
                    },
                    error: (pfpError) => {
                      // Handle the error
                      console.error('Error uploading profile picture:', pfpError);
                      alert('Failed to upload profile picture');
                    }
                  });
              }
            } else {
              alert('Les informations de la Controleur sont Enregistrer');
            }
          },
          error: (error) => {
            // Handle the error
            console.error('Error updating Controleur:', error);
            alert('Failed to update Controleur');
          }
        });
    } else {
      console.error('Password confirmation failed');
      // You may want to show a message or take other actions here
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          if (typeof e.target?.result === 'string') {
            this.imageData1 = e.target?.result;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }


}
