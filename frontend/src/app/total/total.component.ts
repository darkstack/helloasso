import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebsocketService} from '../../services/websocket';
import {ApiService} from '../../services/api';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total.component.html',
  styleUrl: './total.component.scss'
})
export class TotalComponent implements OnInit{

    Total : string;

    constructor( private socket : WebsocketService,private ApiService: ApiService) {};

    ngOnInit(): void {
        this.getTotal();
        this.socket.Messages.subscribe(s => {
            this.getTotal();
        });
    }

    getTotal(){
            this.ApiService.Total().subscribe(t => this.Total = t as string);
    }
}
