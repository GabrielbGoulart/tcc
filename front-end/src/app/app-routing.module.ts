import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { AuthGuard } from './security/auth-guard';
import { StockGraphComponent } from './stock-graph/stock-graph.component';
import { StockListComponent } from './stock-list/stock-list.component';

const routes: Routes = [
 { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'orders', component: OrderFormComponent },
    { path: 'historic', component: StockListComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
