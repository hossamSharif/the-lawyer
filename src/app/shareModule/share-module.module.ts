import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filterSearch } from './searchpipe';
import { filterSearchCity } from './searchpipeCity';
import { courtFilter } from './courtFilter';
import { customerFilter } from './customerFilter';
import { caseFilter } from './caseFilter';


@NgModule({
  declarations: [filterSearch,filterSearchCity ,courtFilter ,customerFilter,caseFilter],
  imports: [
    CommonModule  
  ],
  exports: [ filterSearch ,filterSearchCity ,courtFilter ,customerFilter,caseFilter] 
})
export class ShareModuleModule { }
