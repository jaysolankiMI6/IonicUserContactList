import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactdetailPageRoutingModule } from './contactdetail-routing.module';

import { ContactdetailPage } from './contactdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactdetailPageRoutingModule
  ],
  declarations: [ContactdetailPage]
})
export class ContactdetailPageModule {}
