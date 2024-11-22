import { Injectable } from '@angular/core';
import {observable, Observable, Observer, Subject} from 'rxjs';
import { WSMessage } from '../app/models/WSMessage';
import {environment} from '../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class WebsocketService {

    private isConnected: Boolean = false;
    private socket: WebSocket;
    
    public Messages: Subject<WSMessage>


    trydelay = function(ms:number) { new Promise(res => setTimeout(res, ms));}

    constructor() {
        this.connect();
        this.Messages = new Subject<WSMessage>();
    }

    needConnect() {
        return !this.isConnected;
    }
    connect(){
     this.socket = new WebSocket((environment.production?'wss://':'ws://') +environment.apiUrl+'/notify');

    this.socket.onopen = () => {
      this.isConnected = true;
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      let e = JSON.parse(event.data);
      this.Messages.next(
          new WSMessage(e.message as String,e.name as String,e.amount as number)
      );
    };

    this.socket.onclose = (event) => {
     this.isConnected = false;  
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
        console.log("Connection");
    }

    async reconnect(){
        while(!this.isConnected){
            try{
                this.connect();
                await this.trydelay(5000);

            }
            catch{
                console.log("Retrying");
            }
        }
    }

}
