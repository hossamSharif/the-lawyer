import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDiscountPage } from './edit-discount.page';

const routes: Routes = [
  {
    path: '',
    component: EditDiscountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDiscountPageRoutingModule {}
