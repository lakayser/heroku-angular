import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../enviroments/environments';
import { Courts } from '../interfaces/courts.interface';

@Injectable({
  providedIn: 'root'
})
export class CourtsService {

  private readonly baseURL: string = environments.baseURL;
  private http            : HttpClient = inject(HttpClient);

  getCourts(idOrg: string): Observable<Courts[]> {
    const URL     = `${this.baseURL}/api/courts/listActive/${idOrg}`;
    const token   = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'x-token': `${token}`
    }); 

    return this.http.get<Courts[]>(URL, {headers});
  };

};