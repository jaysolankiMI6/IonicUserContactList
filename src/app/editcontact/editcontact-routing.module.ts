import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcontactPage } from './editcontact.page';

const routes: Routes = [
  {
    path: '',
    component: EditcontactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcontactPageRoutingModule {}
