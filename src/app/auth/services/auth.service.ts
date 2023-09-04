import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { AuthStatus, LoginResponse, User } from '../interfaces';

import { environments } from '../../enviroments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseURL: string = environments.baseURL;
  private http            : HttpClient = inject(HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus  = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed<User|null>(() => this._currentUser());
  public authStatus  = computed<AuthStatus>(() => this._authStatus());

  login(email: string, password: string): Observable<boolean> {
    const url  = `${this.baseURL}/api/auth`;
    const body = {email, password};

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(({user, token}) => {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);

          console.log({user, token});
        }),
        map(() => true),
        catchError(err => throwError(() => err.error.msg)),
      );
  };

};