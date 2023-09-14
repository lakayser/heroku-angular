import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environments } from '../../enviroments/environments';
import { Observable } from 'rxjs';
import { Hours } from '../interfaces/hours.interface';

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  private readonly baseURL: string = environments.baseURL;
  private http            : HttpClient = inject(HttpClient);

  getHours(idOrg: string|null, idCourt: string|null, weekNumber: number): Observable<Hours[]> {
    const URL     = `${this.baseURL}/api/hours/active/${idOrg}/${idCourt}?weekNumber=${weekNumber}`;
    const token   = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': `${token}`
    }); 

    return this.http.get<Hours[]>(URL, {headers});
  };

};