import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountRecordPage } from './discount-record.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountRecordPageRoutingModule {}
