import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth() {
    return !!localStorage.getItem('token');
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvTNadKd97CRJJkV81r_h3VO21WjHxUN8',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
