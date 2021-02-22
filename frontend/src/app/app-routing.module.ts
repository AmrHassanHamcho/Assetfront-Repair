import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent} from './header/about/about.component';
import {ContactUsComponent} from './header/contact-us/contact-us.component';
import {SearchComponent} from './search/search.component';
import {InspectionComponent} from './inspection/inspection.component';
import {ServiceComponent} from './service/service.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'search'},
  {path: 'search', component: SearchComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'inspection', component: InspectionComponent},
  {path: 'service', component: ServiceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
