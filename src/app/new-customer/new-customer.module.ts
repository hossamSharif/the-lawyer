import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCustomerPageRoutingModule } from './new-customer-routing.module';

import { NewCustomerPage } from './new-customer.page';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewCustomerPageRoutingModule
  ],
  declarations: [NewCustomerPage]
})
export class NewCustomerPageModule {}
