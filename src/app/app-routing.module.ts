import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DeveloperComponent } from './components/developer/developer.component';
import { LoginComponent } from './components/login/login.component';
import { RoleGuard } from './guards/role.guard';
const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'develop', component: DeveloperComponent, canActivate: [RoleGuard], data: {expectedRole: 'develop'},
  children: [
  ]},
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: {expectedRole: 'admin'},
  children: [
  ]},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
