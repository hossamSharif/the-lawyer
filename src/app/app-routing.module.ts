import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './auth/auth-gaurd.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'folder/dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
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
    path: 'new-consultation',
    loadChildren: () => import('./new-consultation/new-consultation.module').then( m => m.NewConsultationPageModule)
  },
  {
    path: 'new-session',
    loadChildren: () => import('./new-session/new-session.module').then( m => m.NewSessionPageModule)
  },
  {
    path: 'folder/sessions',
    loadChildren: () => import('./sessions/sessions.module').then( m => m.SessionsPageModule)
  },
  {
    path: 'folder/edit-customer',
    loadChildren: () => import('./edit-customer/edit-customer.module').then( m => m.EditCustomerPageModule)
  },
  {
    path: 'folder/users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'edit-case',
    loadChildren: () => import('./edit-case/edit-case.module').then( m => m.EditCasePageModule)
  },
  {
    path: 'edit-session',
    loadChildren: () => import('./edit-session/edit-session.module').then( m => m.EditSessionPageModule)
  },
  {
    path: 'files',
    loadChildren: () => import('./files/files.module').then( m => m.FilesPageModule)
  },
  {
    path: 'edit-consultation',
    loadChildren: () => import('./edit-consultation/edit-consultation.module').then( m => m.EditConsultationPageModule)
  },  {
    path: 'new-casefile',
    loadChildren: () => import('./new-casefile/new-casefile.module').then( m => m.NewCasefilePageModule)
  },
  {
    path: 'edit-casefile',
    loadChildren: () => import('./edit-casefile/edit-casefile.module').then( m => m.EditCasefilePageModule)
  },
  {
    path: 'new-contract',
    loadChildren: () => import('./new-contract/new-contract.module').then( m => m.NewContractPageModule)
  },
  {
    path: 'new-contract-file',
    loadChildren: () => import('./new-contract-file/new-contract-file.module').then( m => m.NewContractFilePageModule)
  },
  {
    path: 'contract-files',
    loadChildren: () => import('./contract-files/contract-files.module').then( m => m.ContractFilesPageModule)
  },
  {
    path: 'contract-services',
    loadChildren: () => import('./contract-services/contract-services.module').then( m => m.ContractServicesPageModule)
  },
  {
    path: 'new-contract-service',
    loadChildren: () => import('./new-contract-service/new-contract-service.module').then( m => m.NewContractServicePageModule)
  }



  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
