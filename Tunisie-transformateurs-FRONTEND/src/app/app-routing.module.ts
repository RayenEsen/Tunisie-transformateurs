import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransformateurInfoComponent } from './Transformateur-info/Transformateur-info.component';
import { DefaultComponentComponent } from './Default-component/Default-component.component';
import { Add_ModifyTransformateurComponent } from './Add_Modify-Transformateur/Add_Modify-Transformateur.component';

const routes: Routes = [
  { path: 'Transformateur', component: TransformateurInfoComponent },
  { path: 'Ajouter_Transformateur', component: Add_ModifyTransformateurComponent },
  { path: '', component: DefaultComponentComponent }, // Default route
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
