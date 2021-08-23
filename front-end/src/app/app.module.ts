import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockListComponent } from './stock-list/stock-list.component';
import {  DxChartModule } from 'devextreme-angular';
import { StockGraphComponent } from './stock-graph/stock-graph.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './security/jwtInterceptor';
import { OrderFormComponent } from './order-form/order-form.component';
@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    StockGraphComponent,
    DashboardComponent,
    LoginComponent,
    OrderFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxChartModule,
    HttpClientModule,
    NgApexchartsModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
