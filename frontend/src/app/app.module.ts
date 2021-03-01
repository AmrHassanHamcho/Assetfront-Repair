import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { AboutComponent } from './header/about/about.component';
import { ContactUsComponent } from './header/contact-us/contact-us.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { InspectionComponent } from './inspection/inspection.component';
import {MatMenuModule} from '@angular/material/menu';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {VehiclesService} from '../vehicle-service/vehicle.service';
import {AppHttpInterceptor} from './interceptor/appIntercerptor';
import { TcrComponent } from './tcr/tcr.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    AboutComponent,
    ContactUsComponent,
    SubHeaderComponent,
    HomeComponent,
    ServiceComponent,
    InspectionComponent,
    TcrComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FormsModule,
        HttpClientModule,
        MatMenuModule
    ],
  providers: [VehiclesService,

  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
