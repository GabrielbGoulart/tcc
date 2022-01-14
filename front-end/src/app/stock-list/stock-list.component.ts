import { Component, OnInit } from '@angular/core';
import { orderNames } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stock_order = orderNames
  activeStocks: any = []
  selectedStock: string = ""

  constructor() { }

  ngOnInit(): void {
    // for (let i = 0; i < 20; i++) {
      // this.activeStocks.push(orderNames[i])
    // }
    this.refreshSelectableOrders()

  }
  arrayRows() {
    return Array(Math.ceil(this.activeStocks.length / 2))
  }
  addStock() {
    this.activeStocks.push(this.selectedStock)
    this.refreshSelectableOrders()
  }
  refreshSelectableOrders(){
    this.stock_order=this.stock_order.filter((s:any)=>!this.activeStocks.includes(s))
  }
  removeStock(stock: string) {
    this.activeStocks = this.activeStocks.filter((s:any) => s != stock)
    this.refreshSelectableOrders()
  
  }
}
