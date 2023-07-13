import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RewardComponent } from './reward/reward.component';
import { TrackingDetailComponent } from './tracking-detail/tracking-detail.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NeedHelpComponent } from './need-help/need-help.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'TrackingDetail/:trackingNumber', component : TrackingDetailComponent},
  {path:'Reward', component : RewardComponent},
  {path:'TrackingList', component : TrackingListComponent},
  {path:'ContactUs', component : ContactUsComponent},
  {path:'Footer', component : FooterComponent},
  {path:'Header', component : HeaderComponent},
  {path:'NeedHelp', component : NeedHelpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
