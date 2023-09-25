import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environments } from '../../enviroments/environments';
import { Observable, catchError, throwError } from 'rxjs';
import { Hours } from '../interfaces/hours.interface';

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  private readonly baseURL: string = environments.baseURL;
  private http            : HttpClient = inject(HttpClient);

  private idOrg : string|null =localStorage.getItem('idOrg');
  private token : string|null = localStorage.getItem('token');

  getHours(idOrg: string|null, idCourt: string|null, weekNumber: number): Observable<Hours[]> {
    const URL     = `${this.baseURL}/api/hours/active/${idOrg}/${idCourt}?weekNumber=${weekNumber}`;
    const token   = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': `${token}`
    }); 

    return this.http.get<Hours[]>(URL, {headers});
  };


  postHours(startHour:string, endHour: string, range: number, idCourt: string, price: number ):Observable<Hours>{
    const URL = `${this.baseURL}/api/hours/${this.idOrg}`
    const headers = new HttpHeaders({
      'x-token': `${this.token}`
    });
    const body = {
      startHour,
      endHour,
      range,
      idCourt,
      price
    }
    return this.http.post<Hours>(URL, body, {headers})
      .pipe(
        catchError(err=> throwError(()=> console.log(err)))
      )
  }
  
  

};