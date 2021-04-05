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
import {DialogContentExampleDialog, ServiceComponent} from './service/service.component';
import {DialogInspectionComponent, InspectionComponent} from './inspection/inspection.component';
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
import {Checkpoint} from './asset/checkPoint';
import { FallBackComponent } from './fall-back/fall-back.component';
import {MatIconModule} from '@angular/material/icon';

import {MatInputModule} from '@angular/material/input';

import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { TestComponent } from './test/test.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import { PersonalDataComponent } from './tcr/personal-data/personal-data.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {PDFService} from './PDF/pdf.service';
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
    TestComponent,
    DialogContentExampleDialog,
    PersonalDataComponent,
    DialogInspectionComponent,


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

        MatInputModule,

        MatDialogModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FlexLayoutModule,
        MaterialFileInputModule,
                NgxQRCodeModule
    ],


  providers: [VehiclesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    ServiceComponent,
    InspectionComponent,
    PDFService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogWindowComponent],

})
export class AppModule { }
