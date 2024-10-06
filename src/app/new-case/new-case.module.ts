import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FilterPipe } from "./pipe";
import { FilterPipe2 } from "./pipe2";
import { FilterPipe3 } from "./pipe3";
import { NewCasePageRoutingModule } from './new-case-routing.module';

import { NewCasePage } from './new-case.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewCasePageRoutingModule
  ],
  declarations:
   [NewCasePage,
     FilterPipe,
    FilterPipe2,
    FilterPipe3
  ] ,
exports: [
  FilterPipe,
  FilterPipe2,
  FilterPipe3 
]
})
export class NewCasePageModule {}
