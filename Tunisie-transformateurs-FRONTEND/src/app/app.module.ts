import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button'
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { CalendarModule } from 'primeng/calendar';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InplaceModule } from 'primeng/inplace';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TimelineModule } from 'primeng/timeline';
import { DeferModule } from 'primeng/defer';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TransformateurInfoComponent } from './Transformateur-info/Transformateur-info.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultComponentComponent } from './Default-component/Default-component.component';
import { Add_ModifyTransformateurComponent } from './Add_Modify-Transformateur/Add_Modify-Transformateur.component';
import { HttpClientModule } from '@angular/common/http';
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
import { MagnetiqueComponentComponent } from './Magnetique-component/Magnetique-component.component';
import { MontageComponentComponent } from './Montage-component/Montage-component.component';
import { UsersComponentComponent } from './Users-component/Users-component.component';
import { ApresMontageComponentComponent } from './ApresMontage-component/ApresMontage-component.component';
import { EcuvageComponentComponent } from './Ecuvage-component/Ecuvage-component.component';
import { RemplissageComponentComponent } from './Remplissage-component/Remplissage-component.component';
import { LivraisonComponentComponent } from './Livraison-component/Livraison-component.component';
import { PeintureComponentComponent } from './Peinture-component/Peinture-component.component';
import { ConseptionComponentComponent } from './Conseption-component/Conseption-component.component';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { AvatarModule } from 'primeng/avatar';
import { ChartModule } from 'primeng/chart';
import { OutilsComponentComponent } from './outils-component/outils-component.component';

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
    BobinageMTComponentComponent,
    MagnetiqueComponentComponent,
    MontageComponentComponent,
      UsersComponentComponent,
      ApresMontageComponentComponent,
      EcuvageComponentComponent,
      RemplissageComponentComponent,
      LivraisonComponentComponent,
      PeintureComponentComponent,
      ConseptionComponentComponent,
      OutilsComponentComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MessagesModule,
    PasswordModule,
    ToastModule,
    ConfirmDialogModule,
    ImageModule,
    CalendarModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    DropdownModule,
    AutoCompleteModule,
    DialogModule,
    AvatarModule,
    InplaceModule,
    TooltipModule,
    RippleModule,
    PaginatorModule,
    SidebarModule,
    OrganizationChartModule,
    TimelineModule,
    DeferModule,
    ChartModule,
    TreeSelectModule,
    TreeModule,
    TableModule,
    TabMenuModule,
    SliderModule,
    SpeedDialModule,
    InputGroupModule,
    InputGroupAddonModule,
    ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]

})
export class AppModule { }
