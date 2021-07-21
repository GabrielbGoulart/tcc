import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockGraphComponent } from './stock-graph/stock-graph.component';
const routes: Routes = [
  {
    path: '',
    component: StockGraphComponent

}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
