import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSessionPageRoutingModule } from './new-session-routing.module';

import { NewSessionPage } from './new-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewSessionPageRoutingModule
  ],
  declarations: [NewSessionPage]
})
export class NewSessionPageModule {}
