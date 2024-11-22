
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import { Donator, WSMessage } from '../app/models/WSMessage';
import {environment} from '../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(private httpClient : HttpClient) {
    }

    Total() {
        return this.httpClient.get(`https://${environment.apiUrl}/total`);
    }

    TopDonators() : Observable<Donator[]> {
        return this.httpClient.get<Donator[]>(`https://${environment.apiUrl}/topdonators`);
    }
}
