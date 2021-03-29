import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent} from './header/about/about.component';
import {ContactUsComponent} from './header/contact-us/contact-us.component';
import {SearchComponent} from './search/search.component';
import {InspectionComponent} from './inspection/inspection.component';
import {ServiceComponent} from './service/service.component';
import {HomeComponent} from './home/home.component';
import {TcrComponent} from './tcr/tcr.component';
import {FallBackComponent} from './fall-back/fall-back.component';
import {TestComponent} from "./test/test.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'search'},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'inspection', component: InspectionComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'tcr', component: TcrComponent},
  {path: '**', component: FallBackComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

