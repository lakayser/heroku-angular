import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { environments } from '../../enviroments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';

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

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  };

  login(email: string, password: string): Observable<boolean> {
    const URL  = `${this.baseURL}/api/auth`;
    const body = {email, password};

    return this.http.post<LoginResponse>(URL, body)
      .pipe(
        map(({user, token}) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.msg)),
      );
  };

};