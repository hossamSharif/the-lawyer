import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCasePageRoutingModule } from './edit-case-routing.module';

import { EditCasePage } from './edit-case.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditCasePageRoutingModule
  ],
  declarations: [EditCasePage]
})
export class EditCasePageModule {}
