import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDiscountPageRoutingModule } from './edit-discount-routing.module';

import { EditDiscountPage } from './edit-discount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDiscountPageRoutingModule
  ],
  declarations: [EditDiscountPage]
})
export class EditDiscountPageModule {}
