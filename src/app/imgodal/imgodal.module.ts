import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgodalPageRoutingModule } from './imgodal-routing.module';

import { ImgodalPage } from './imgodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImgodalPageRoutingModule
  ],
  declarations: [ImgodalPage]
})
export class ImgodalPageModule {}
