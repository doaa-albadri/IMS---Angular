import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // ordersData: { title: string; stat: number }[] = [];
  constructor(private http: HttpClient) {}

  fetchStats() {
    return this.http.get(
      'https://ng-project-c984a-default-rtdb.firebaseio.com/stats.json'
    );
  }

  fetchOrdersData() {
    return this.http.get(
      'https://ng-project-c984a-default-rtdb.firebaseio.com/orders.json'
    );
  }

  fetchProfitsData() {
    return this.http.get(
      'https://ng-project-c984a-default-rtdb.firebaseio.com/profits.json'
    );
  }

  // addData() {
  //   this.http
  //     .post<{ name: string }>(
  //       'https://ng-project-c984a-default-rtdb.firebaseio.com/profits.json',
  //       {
  //         labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  //         datasets: [
  //           { data: [65, 59, 80, 81, 56, 55, 40], label: 'Convenience Goods' },
  //           { data: [28, 48, 40, 19, 86, 27, 90], label: 'Impulse Goods' },
  //         ],
  //       },
  //       { observe: 'response' }
  //     )
  //     .subscribe((resData) => {
  //       console.log(resData);
  //     });
  // }
}
