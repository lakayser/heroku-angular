import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Courts } from '../interfaces/courts.interface';

@Injectable({
  providedIn: 'root'
})
export class CourtsService {

  private readonly baseURL: string = environments.baseURL;
  private http            : HttpClient = inject(HttpClient);

  private token : string|null = localStorage.getItem('token');
  private idOrg : string|null =localStorage.getItem('idOrg');
  

  getCourts(idOrg: string|null): Observable<Courts[]> {
    const URL     = `${this.baseURL}/api/courts/listActive/${idOrg}`;
    
    const headers = new HttpHeaders({
      'x-token': `${this.token}`
    }); 

    return this.http.get<Courts[]>(URL, {headers});
  };

  postCourts(name:string):Observable<Courts>{
    const URL = `${this.baseURL}/api/courts/${this.idOrg}`
    const headers = new HttpHeaders({
      'x-token': `${this.token}`
    });
    const body = {
     name
    };
    return this.http.post<Courts>(URL, body, {headers})
      .pipe(
        catchError(err=> throwError(()=>err.error.msg))
      )
  }


};