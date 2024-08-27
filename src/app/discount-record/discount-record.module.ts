import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscountRecordPageRoutingModule } from './discount-record-routing.module';

import { DiscountRecordPage } from './discount-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscountRecordPageRoutingModule
  ],
  declarations: [DiscountRecordPage]
})
export class DiscountRecordPageModule {}
