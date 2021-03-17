import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from './header/about/about.component';
import { ContactUsComponent } from './header/contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { InspectionComponent } from './inspection/inspection.component';
import { DialogWindowComponent } from './search/dialog-window/dialog-window.component';
import {MatMenuModule} from '@angular/material/menu';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {VehiclesService} from '../vehicle-service/vehicle.service';
import {AppHttpInterceptor} from './interceptor/appIntercerptor';
import { TcrComponent } from './tcr/tcr.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {Checkpoint} from './asset/checkPoint';
import { FallBackComponent } from './fall-back/fall-back.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    AboutComponent,
    ContactUsComponent,
    HomeComponent,
    ServiceComponent,
    InspectionComponent,
    TcrComponent,
    FallBackComponent,
    DialogWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatRadioModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [VehiclesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogWindowComponent]
})
export class AppModule { }
