import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTaskPageRoutingModule } from './new-task-routing.module';

import { NewTaskPage } from './new-task.page';
import { FilesPageModule } from '../files/files.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewTaskPageRoutingModule,
    FilesPageModule
  ],
  declarations: [NewTaskPage]
})
export class NewTaskPageModule {}
