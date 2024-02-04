import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TransformateurInfoComponent } from './Transformateur-info/Transformateur-info.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultComponentComponent } from './Default-component/Default-component.component';
import { Add_ModifyTransformateurComponent } from './Add_Modify-Transformateur/Add_Modify-Transformateur.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EssaiComponentComponent } from './Essai-component/Essai-component.component';
import { AddComponentComponent } from './Add-component/Add-component.component';
import { EditProfileComponentComponent } from './EditProfile-component/EditProfile-component.component';
import { CreateAcountComponentComponent } from './CreateAcount-component/CreateAcount-component.component';
import { InscriptionComponentComponent } from './Inscription-component/Inscription-component.component';
import { PlanificationComponentComponent } from './Planification-component/Planification-component.component';
import { ControleComponentComponent } from './Controle-component/Controle-component.component';
import { BobinageComponentComponent } from './Bobinage-component/Bobinage-component.component';
import { BobinageMTComponentComponent } from './BobinageMT-component/BobinageMT-component.component';
@NgModule({
  declarations: [		
    AppComponent,
      NavBarComponent,
      TopNavComponent,
      TransformateurInfoComponent,
      FooterComponent,
      DefaultComponentComponent,
      Add_ModifyTransformateurComponent,
      EssaiComponentComponent,
      AddComponentComponent,
      EditProfileComponentComponent,
      CreateAcountComponentComponent,
      InscriptionComponentComponent,
      PlanificationComponentComponent,
      ControleComponentComponent,
      BobinageComponentComponent,
      BobinageMTComponentComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
