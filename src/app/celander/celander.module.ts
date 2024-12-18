import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CelanderPageRoutingModule } from './celander-routing.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CelanderPage } from './celander.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    CelanderPageRoutingModule
  ],
  declarations: [CelanderPage]
})
export class CelanderPageModule {}
