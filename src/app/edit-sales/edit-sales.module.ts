import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSalesPageRoutingModule } from './edit-sales-routing.module';

import { EditSalesPage } from './edit-sales.page'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    EditSalesPageRoutingModule
  ],
  exports: [ ],
  declarations: [EditSalesPage]
})
export class EditSalesPageModule {}
