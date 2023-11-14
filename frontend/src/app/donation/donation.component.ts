import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebsocketService} from '../../services/websocket';
import {Subscription, delay,pipe, delayWhen, concatMap, forkJoin, timer, ignoreElements, startWith, merge} from 'rxjs';
import { EMPTY,of,from, concat,interval,zip,throttle, filter } from 'rxjs';
import { WSMessage } from '../models/WSMessage';
@Component({
    selector: 'app-donation',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './donation.component.html',
    styleUrl: './donation.component.scss'
})
export class DonationComponent implements OnInit {
    private test : number = 0;
    private sub : Subscription;
    public Data : String[]
    public Name : String
    public Euro : number
    public playing : Boolean = false;
    public Message : String

    bound = timer(10000).pipe(filter(_ => false));
    constructor( private socket : WebsocketService) {};
    ngOnInit(){
        this.sub = 
//           this.socket.Messages.asObservable().pipe(concat(item => timer(10000).pipe(ignoreElements(),startWith(item))))
//           zip(from(this.socket.Messages),interval(10000),(a,b) => a)
                //
//            this.socket.Messages.pipe(concatMap((value,index) => concat(of(value), EMPTY.pipe(delay(10000)))))
            this.socket.Messages.pipe(concatMap(v => merge(of(v),this.bound)))
            .subscribe((r)  => {
            this.test+=1
            let e = r as WSMessage;
            console.log('Donation',this.test,e)
            this.Name = e.Name;
            this.Euro = e.Euro;
            this.Message = e.Message;
            this.playing = true;
        });
    }

    public onEnd(){
        setTimeout(()=>{ this.playing = false; } , 3000);
    }


}
