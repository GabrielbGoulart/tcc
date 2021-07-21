import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockListComponent } from './stock-list/stock-list.component';
import {  DxChartModule } from 'devextreme-angular';
import { StockGraphComponent } from './stock-graph/stock-graph.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    StockGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxChartModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
