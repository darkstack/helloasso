import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebsocketService} from '../../services/websocket';
import {ApiService} from '../../services/api';
import {Donator} from '../models/WSMessage';

@Component({
  selector: 'app-topdonors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topdonors.component.html',
  styleUrl: './topdonors.component.scss'
})
export class TopdonorsComponent implements OnInit{

    donators: Donator[] = []

    constructor( private socket : WebsocketService,private ApiService: ApiService) {};

    ngOnInit(): void {
        this.getDonators();
        this.socket.Messages.subscribe(s => {
            this.getDonators();
        });
    }

    getDonators(){
            this.ApiService.TopDonators().subscribe(donators => this.donators = donators);
    }
}
