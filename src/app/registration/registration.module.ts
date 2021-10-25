import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationPageRoutingModule } from './registration-routing.module';
import { RegistrationPage } from './registration.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationPage
      }
    ])
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
