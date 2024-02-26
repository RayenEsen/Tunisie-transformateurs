import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransformateurInfoComponent } from './Transformateur-info/Transformateur-info.component';
import { DefaultComponentComponent } from './Default-component/Default-component.component';
import { Add_ModifyTransformateurComponent } from './Add_Modify-Transformateur/Add_Modify-Transformateur.component';
import { EssaiComponentComponent } from './Essai-component/Essai-component.component';
import { AddComponentComponent } from './Add-component/Add-component.component';
import { EditProfileComponentComponent } from './EditProfile-component/EditProfile-component.component';
import { CreateAcountComponentComponent } from './CreateAcount-component/CreateAcount-component.component';
import { PlanificationComponentComponent } from './Planification-component/Planification-component.component';
import { AuthGuard } from './guards/auth.guard';
import { InscriptionComponentComponent } from './Inscription-component/Inscription-component.component';
import { ControleComponentComponent } from './Controle-component/Controle-component.component';
import { BobinageComponentComponent } from './Bobinage-component/Bobinage-component.component';
import { BobinageMTComponentComponent } from './BobinageMT-component/BobinageMT-component.component';
import { MagnetiqueComponentComponent } from './Magnetique-component/Magnetique-component.component';
import { MontageComponentComponent } from './Montage-component/Montage-component.component';
import { UsersComponentComponent } from './Users-component/Users-component.component';
import { ApresMontageComponentComponent } from './ApresMontage-component/ApresMontage-component.component'
import { EcuvageComponentComponent } from './Ecuvage-component/Ecuvage-component.component';
import { RemplissageComponentComponent } from './Remplissage-component/Remplissage-component.component';
import { LivraisonComponentComponent } from './Livraison-component/Livraison-component.component';
import { PeintureComponentComponent } from './Peinture-component/Peinture-component.component';
import { ConseptionComponentComponent } from './Conseption-component/Conseption-component.component';
const routes: Routes = [
  { path: 'Transformateur', component: TransformateurInfoComponent , canActivate: [AuthGuard]},
  { path: 'Ajouter_Transformateur', component: Add_ModifyTransformateurComponent , canActivate: [AuthGuard]},
  { path: 'Ajouter_Transformateur/:id', component: Add_ModifyTransformateurComponent , canActivate: [AuthGuard]},
  { path: 'Essai_Transformateur/:id' , component: EssaiComponentComponent , canActivate: [AuthGuard]},
  { path: 'Add_transformateur' , component: AddComponentComponent , canActivate: [AuthGuard]},
  { path: 'Edit_profile' , component : EditProfileComponentComponent , canActivate: [AuthGuard]},
  { path: 'Sign_in' , component : CreateAcountComponentComponent},
  { path: 'Planification' , component : PlanificationComponentComponent , canActivate: [AuthGuard]},
  { path: 'Utilisateurs' , component : UsersComponentComponent , canActivate: [AuthGuard]},
  { path: 'Bobinage/:id/:etapenumero' , component : BobinageComponentComponent , canActivate: [AuthGuard]},
  { path: 'BobinageMT/:id/:etapenumero' , component : BobinageMTComponentComponent , canActivate: [AuthGuard]},
  { path: 'Magnetique/:id/:etapenumero' , component : MagnetiqueComponentComponent , canActivate: [AuthGuard]},
  { path: 'Ecuvage/:id/:etapenumero' , component : EcuvageComponentComponent, canActivate: [AuthGuard]},
  { path: 'Livraison', component : LivraisonComponentComponent ,  canActivate: [AuthGuard]},
  { path: 'Montage/:id/:etapenumero' , component : MontageComponentComponent , canActivate: [AuthGuard]},
  { path: 'ApresMontage/:id/:etapenumero' , component : ApresMontageComponentComponent , canActivate: [AuthGuard]},
  { path: 'Remplissage/:id/:etapenumero' , component : RemplissageComponentComponent, canActivate: [AuthGuard]},
  { path: 'Peinture/:id/:etapenumero' , component : PeintureComponentComponent, canActivate: [AuthGuard]},
  { path: 'Conseption/:id/:etapenumero' , component : ConseptionComponentComponent, canActivate: [AuthGuard]},

  { path: 'Sign_up' , component : InscriptionComponentComponent},
  { path: 'Controle/:id' , component : ControleComponentComponent, canActivate: [AuthGuard]},
  { path: '', component: DefaultComponentComponent }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
