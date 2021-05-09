import { NgModule } from '@angular/core';
import { AppHttpInterceptor } from './interceptor/appIntercerptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { FileSaverModule } from 'ngx-filesaver';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppRoutingModule } from './app-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BrowserModule } from '@angular/platform-browser';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { TcrComponent } from './tcr/tcr.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './header/about/about.component';
import { FallBackComponent } from './fall-back/fall-back.component';
import { TcrDialogComponent } from './tcr/tcr-dialog/tcr-dialog.component';
import { ContactUsComponent } from './header/contact-us/contact-us.component';
import { PersonalDataComponent } from './tcr/personal-data/personal-data.component';
import { DialogWindowComponent } from './search/dialog-window/dialog-window.component';
import { DialogContentExampleDialog, ServiceComponent } from './service/service.component';
import { DialogInspectionComponent, InspectionComponent } from './inspection/inspection.component';

// Material Design modules
import { MatCardModule} from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

// Service files
import { PDFService } from './PDF/pdf.service';
import { VehiclesService } from '../vehicle-service/vehicle.service';


@NgModule({
  declarations: [
    TcrComponent,
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    ServiceComponent,
    FallBackComponent,
    ContactUsComponent,
    TcrDialogComponent,
    InspectionComponent,
    DialogWindowComponent,
    PersonalDataComponent,
    DialogInspectionComponent,
    DialogContentExampleDialog,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CollapseModule,
    FileSaverModule,
    NgxQRCodeModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    ImgFallbackModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatRippleModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialFileInputModule,
  ],
  providers: [VehiclesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    PDFService,
    ServiceComponent,
    InspectionComponent,
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }
