import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TransformateurInfoComponent } from './Transformateur-info/Transformateur-info.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultComponentComponent } from './Default-component/Default-component.component';

@NgModule({
  declarations: [					
    AppComponent,
      NavBarComponent,
      TopNavComponent,
      TransformateurInfoComponent,
      FooterComponent,
      DefaultComponentComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
