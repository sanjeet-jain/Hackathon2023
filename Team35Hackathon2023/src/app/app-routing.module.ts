import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RewardComponent } from './reward/reward.component';
import { TrackingDetailComponent } from './tracking-detail/tracking-detail.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'TrackingDetail', component : TrackingDetailComponent},
  {path:'Reward', component : RewardComponent},
  {path:'TrackingList', component : TrackingListComponent},
  {path:'ContactUs', component : ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
