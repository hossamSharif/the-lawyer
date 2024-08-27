import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './auth/auth-gaurd.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'folder/sales-record',
    loadChildren: () => import('./sales-record/sales-record.module').then( m => m.SalesRecordPageModule)
  },
  {
    path: 'folder/edit-sales',
    loadChildren: () => import('./edit-sales/edit-sales.module').then( m => m.EditSalesPageModule)
  },
  {
    path: 'print-modal',
    loadChildren: () => import('./print-modal/print-modal.module').then( m => m.PrintModalPageModule)
  },
  {
    path: 'item-modal',
    loadChildren: () => import('./item-modal/item-modal.module').then( m => m.ItemModalPageModule)
  },
  {
    path: 'folder/pos-sales',
    loadChildren: () => import('./pos-sales/pos-sales.module').then( m => m.PosSalesPageModule)
  },{
    path: 'folder/items',
    loadChildren: () => import('./items/items.module').then( m => m.ItemsPageModule)
  },
  {
    path: 'imgodal',
    loadChildren: () => import('./imgodal/imgodal.module').then( m => m.ImgodalPageModule)
  },
  {
    path: 'folder/discount',
    loadChildren: () => import('./discount/discount.module').then( m => m.DiscountPageModule)
  },
  {
    path: 'folder/discount-record',
    loadChildren: () => import('./discount-record/discount-record.module').then( m => m.DiscountRecordPageModule)
  },
  {
    path: 'folder/edit-discount',
    loadChildren: () => import('./edit-discount/edit-discount.module').then( m => m.EditDiscountPageModule)
  },
  {
    path: 'folder/cash3',
    loadChildren: () => import('./cash3/cash3.module').then( m => m.Cash3PageModule)
  },
  {
    path: 'folder/spend-record2',
    loadChildren: () => import('./spend-record2/spend-record2.module').then( m => m.SpendRecord2PageModule)
  },
  {
    path: 'folder/cases',
    loadChildren: () => import('./cases/cases.module').then( m => m.CasesPageModule)
  },
  {
    path: 'folder/new-case',
    loadChildren: () => import('./new-case/new-case.module').then( m => m.NewCasePageModule)
  },
  {
    path: 'folder/lawyers',
    loadChildren: () => import('./lawyers/lawyers.module').then( m => m.LawyersPageModule)
  },
  {
    path: 'folder/new-lawyer',
    loadChildren: () => import('./new-lawyer/new-lawyer.module').then( m => m.NewLawyerPageModule)
  },
  {
    path: 'folder/tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksPageModule)
  },
  {
    path: 'folder/new-task',
    loadChildren: () => import('./new-task/new-task.module').then( m => m.NewTaskPageModule)
  },
  {
    path: 'folder/celander',
    loadChildren: () => import('./celander/celander.module').then( m => m.CelanderPageModule)
  },
  {
    path: 'folder/customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'folder/new-customer',
    loadChildren: () => import('./new-customer/new-customer.module').then( m => m.NewCustomerPageModule)
  },
  {
    path: 'folder/dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'folder/contracts',
    loadChildren: () => import('./contracts/contracts.module').then( m => m.ContractsPageModule)
  },
  {
    path: 'folder/consultations',
    loadChildren: () => import('./consultations/consultations.module').then( m => m.ConsultationsPageModule)
  },
  {
    path: 'folder/new-consultation',
    loadChildren: () => import('./new-consultation/new-consultation.module').then( m => m.NewConsultationPageModule)
  },
  {
    path: 'folder/new-session',
    loadChildren: () => import('./new-session/new-session.module').then( m => m.NewSessionPageModule)
  },
  {
    path: 'folder/sessions',
    loadChildren: () => import('./sessions/sessions.module').then( m => m.SessionsPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
