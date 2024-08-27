import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgodalPage } from './imgodal.page';

const routes: Routes = [
  {
    path: '',
    component: ImgodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgodalPageRoutingModule {}
