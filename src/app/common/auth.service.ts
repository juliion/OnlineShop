import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { LoginRequest } from './models/login-request';
import { LoginResponse } from './models/login-response';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(user: LoginRequest) {
    console.log(user);
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
    .pipe(
      tap(res => this.setToken(res as LoginResponse))
    )
  }

  private setToken(loginResponse: LoginResponse | null): void {
    console.log('setToken', loginResponse);
    if(loginResponse) {
      const expTime = new Date(new Date().getTime() + loginResponse.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expTime.toString());
      localStorage.setItem('fb-token', loginResponse.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const expTime = new Date(localStorage.getItem('fb-token-exp') as string);
    if(new Date() > expTime){
      this.logout();
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}
