import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSessionPageRoutingModule } from './edit-session-routing.module';

import { EditSessionPage } from './edit-session.page';
import { ShareModuleModule } from '../shareModule/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShareModuleModule,
    EditSessionPageRoutingModule
  ],
  declarations: [EditSessionPage]
})
export class EditSessionPageModule {}
