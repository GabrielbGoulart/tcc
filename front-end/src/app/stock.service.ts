import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { webSocketUrl } from './commom';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }
  
  getWsTicks(tickNames:Array<String>){
    const queryString = `${webSocketUrl}?${tickNames.reduce((a,c,i)=>a+`ticks=${c}&`,"")}`
    console.log("queryString",queryString)
    const myWebSocket = webSocket({
      url: queryString,
      deserializer: msg => msg['data']
    }).asObservable();
    return myWebSocket
  }
}
