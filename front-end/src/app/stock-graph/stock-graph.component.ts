import { Component, OnInit } from '@angular/core';
import { PriceService } from './price.service';
@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent implements OnInit {

  dataSource:any
  wwdcDate = new Date(2017, 5, 5);
  tvAnnounceDate = new Date(2019, 2, 25);
  watchReleaseDate = new Date(2015, 3, 24);
  xReleaseDate = new Date(2017, 10, 3);
  seReleaseDate = new Date(2016, 2, 31);

    constructor(private priceService: PriceService) {
        
    }
  
     


  ngOnInit(): void {
    this.priceService.getData('XTED11').subscribe(res => {
      this.dataSource = res;
    });
  }

}
