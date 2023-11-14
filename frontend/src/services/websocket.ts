import { Injectable } from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import { WSMessage } from '../app/models/WSMessage';
@Injectable({
    providedIn: 'root',
})
export class WebsocketService {

    private isConnected: Boolean = false;
    private socket: WebSocket;
    
    public Messages: Subject<WSMessage>

    constructor() {
        this.connect();
        this.Messages = new Subject<WSMessage>();
    }

    needConnect() {
        return !this.isConnected;
    }
    connect(){
        this.socket = new WebSocket('ws://localhost:5000/notify');

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


}
