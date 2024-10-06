import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewConsultationPageRoutingModule } from './new-consultation-routing.module';
import { FilterPipe } from "./pipe";
import { FilterPipe2 } from "./pipe2";
import { FilterPipe3 } from "./pipe3";
import { NewConsultationPage } from './new-consultation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewConsultationPageRoutingModule
  ],
  declarations: [NewConsultationPage,FilterPipe,
    FilterPipe2,
    FilterPipe3
  ] ,
exports: [
  FilterPipe,
  FilterPipe2,
  FilterPipe3 
]
})
export class NewConsultationPageModule {}
