import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactdetailPage } from './contactdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ContactdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactdetailPageRoutingModule {}
