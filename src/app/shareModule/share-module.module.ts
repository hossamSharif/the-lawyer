import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filterSearch } from './searchpipe';
import { filterSearchCity } from './searchpipeCity';
import { courtFilter } from './courtFilter';
import { customerFilter } from './customerFilter';
import { caseFilter } from './caseFilter';
import { TimeFormatPipe } from './timeFormat';


@NgModule({
  declarations: [filterSearch,filterSearchCity ,courtFilter ,customerFilter,caseFilter,TimeFormatPipe],
  imports: [
    CommonModule  
  ],
  exports: [ filterSearch ,filterSearchCity ,courtFilter ,customerFilter,caseFilter,TimeFormatPipe] 
})
export class ShareModuleModule { }
