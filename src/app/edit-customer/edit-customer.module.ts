import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 

import { IonicModule } from '@ionic/angular';

import { EditCustomerPageRoutingModule } from './edit-customer-routing.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { EditCustomerPage } from './edit-customer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditCustomerPageRoutingModule
  ],
  declarations: [EditCustomerPage]
})
export class EditCustomerPageModule {}
