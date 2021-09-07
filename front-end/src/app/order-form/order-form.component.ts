import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API } from '../commom';
import { orderNames } from '../dashboard/dashboard.component';

class DataTablesResponse {
  data: any
  draw: any
  recordsFiltered: any;
  recordsTotal: any;
}
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  orders: any[]=[];
  orderForm:FormGroup
  stocks = orderNames
  constructor(private http: HttpClient,private formBuilder: FormBuilder) { 
    this.orderForm =formBuilder.group({
      stock: [null, Validators.required],
      target_value: [null, Validators.required],
      buynow: [false, Validators.required]
    });
    this.orderForm.controls['buynow'].valueChanges.subscribe(change => {
      if(change){
        this.orderForm.get('target_value')?.disable()
        this.orderForm.get('target_value')?.setValue(null)
      }else{
        this.orderForm.get('target_value')?.enable()

      }
    });
  }
  createOrder(){
    this.http.post(`${API}/orders`,this.orderForm.value).subscribe(response=>{
      window.location.reload();
    })
  }
  ngOnInit(): void {
    
    const that=this
    this.dtOptions = {
      pageLength: 25,
      serverSide: true,
      processing: true,
      searching:false,
      lengthChange:false,
      orderMulti:true,
      info:false,
      pagingType:'simple',
      
      ajax: (dataTablesParameters: any, callback) => {
        console.log(dataTablesParameters)
        let params = new HttpParams()
        params=params.append('_sort',dataTablesParameters.order[0].dir)
        params=params.append('_order',dataTablesParameters.columns[dataTablesParameters.order[0].column].data)
        params=params.append('_page',dataTablesParameters.start)
        params=params.append('_limit',dataTablesParameters.length)
        that.http
          .get(
            `${API}/orders`,{ params: params }).subscribe((resp:any )=> {
            console.log('resp',resp)
            that.orders = resp.rows;
            callback({
              recordsTotal: resp.count,
              recordsFiltered: null,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'target_value' }, { data: 'stock' },{ data: 'createdAt' }]
    };
  }

}
