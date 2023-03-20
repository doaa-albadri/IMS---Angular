import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get(
      'https://ng-project-c984a-default-rtdb.firebaseio.com/stats.json'
    );
  }
}
