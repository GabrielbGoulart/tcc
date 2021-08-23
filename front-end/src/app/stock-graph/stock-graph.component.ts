import { Component, Input, OnInit, ViewChild,OnChanges, OnDestroy } from '@angular/core';
import { PriceService } from './price.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { NgxSpinnerService } from 'ngx-spinner';
import { interval } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { API } from '../commom';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent implements OnInit,OnChanges,OnDestroy {
  // @ViewChild("chart") chart: ChartComponent;
  public options: ChartOptions ;
  public dataSource:any
  objectSource:any
  @Input() bond: any;
  

    constructor(private priceService: PriceService,private http: HttpClient,private spinner: NgxSpinnerService) {
      this.options={
        series: [{
        data: [
        ]
      }],
        chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: "",
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      }
    };
    }
  
     

  ngOnChanges(changes:any){
    console.log(this.bond,changes)
    this.createOptions()
  }
  createOptions(){
    this.spinner.show()
    console.log('testeee',this.bond)
    this.options={
        series: [{
        data: [
        ]
      }],
        chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: this.bond,
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      }
    };
 
    
  }
  ngOnDestroy(){
    this.objectSource.unsubscribe()
  }
  ngOnInit(): void {
    this.createOptions()
    this.objectSource= interval(5000).pipe(mergeMap(() => this.http.get(`${API}/prices/${this.bond}`))).subscribe((res:any) => {
      this.spinner.hide()
      this.dataSource = res;
      console.log(this.bond,this.dataSource)
      this.options.series = [{data:this.dataSource}]
    });
  }

}
