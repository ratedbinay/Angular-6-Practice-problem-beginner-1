import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employee.component';


const appRoutes: Routes = [ 
  { path: 'list', component: ListEmployeesComponent },
  { path: 'create', component: CreateEmployeeComponent },
  { path: 'edit/:id', component: CreateEmployeeComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
