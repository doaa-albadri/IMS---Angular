import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  fetchPrpductsData() {
    return this.http.get(
      'https://ng-project-c984a-default-rtdb.firebaseio.com/products.json'
    );
  }

  deleteProduct(id: number | string) {
    return this.http.delete(
      `https://ng-project-c984a-default-rtdb.firebaseio.com/products/${id}.json`
    );
  }

  addProduct(id: number, name: string, sku: string, price: number) {
    this.http
      .post<any>(
        'https://ng-project-c984a-default-rtdb.firebaseio.com/products.json',
        {
          id: id,
          name: name,
          sku: sku,
          price: price,
        }
      )
      .subscribe((res) => {
        console.log('RESULT:', res);
      });
  }

  // addData() {
  //   this.http
  //     .post<{ name: string }>(
  //       'https://ng-project-c984a-default-rtdb.firebaseio.com/products.json',
  //       [
  //         { id: 13, name: ' name 1', sku: 'sku 1', price: 300 },
  //         { id: 65, name: ' name 2', sku: 'sku 2', price: 70 },
  //         { id: 90, name: ' name 3', sku: 'sku 3', price: 35 },
  //         { id: 33, name: ' name 4', sku: 'sku 4', price: 125 },
  //       ],
  //       { observe: 'response' }
  //     )
  // .subscribe((resData) => {
  //   console.log(resData);
  // });
  // }
}
