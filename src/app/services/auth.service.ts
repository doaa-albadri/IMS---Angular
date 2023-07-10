import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth() {
    return !!localStorage.getItem('token');
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>('http://localhost:5000/login', body);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
