import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransformateurInfoComponent } from './Transformateur-info/Transformateur-info.component';
import { DefaultComponentComponent } from './Default-component/Default-component.component';
import { Add_ModifyTransformateurComponent } from './Add_Modify-Transformateur/Add_Modify-Transformateur.component';
import { EssaiComponentComponent } from './Essai-component/Essai-component.component';
import { AddComponentComponent } from './Add-component/Add-component.component';
import { EditProfileComponentComponent } from './EditProfile-component/EditProfile-component.component';
import { CreateAcountComponentComponent } from './CreateAcount-component/CreateAcount-component.component';
const routes: Routes = [
  { path: 'Transformateur', component: TransformateurInfoComponent },
  { path: 'Ajouter_Transformateur', component: Add_ModifyTransformateurComponent },
  { path: 'Ajouter_Transformateur/:id', component: Add_ModifyTransformateurComponent },
  { path: 'Essai_Transformateur/:id' , component: EssaiComponentComponent},
  { path: 'Add_transformateur' , component: AddComponentComponent},
  { path: 'Edit_profile' , component : EditProfileComponentComponent},
  { path: 'Sign_up' , component : CreateAcountComponentComponent},
  // New route with parameter
  { path: '', component: DefaultComponentComponent }, // Default route
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
