import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GoodsComponent } from './goods/goods.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'goods', component: GoodsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }