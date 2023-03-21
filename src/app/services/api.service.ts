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
    // .subscribe(
    //   (res: any) => {
    //     this.ordersData = res['-NQz3JFXxx7JeleMIRr9'];
    //     // console.log('orders results', this.ordersData);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
  }

  // addData() {
  //   this.http
  //     .post<{ name: string }>(
  //       'https://ng-project-c984a-default-rtdb.firebaseio.com/orders.json',
  //       [
  //         { title: 'Delivered', stat: 83 },
  //         { title: 'Pending', stat: 50 },
  //         { title: 'Delivered', stat: 11 },
  //       ],
  //       { observe: 'response' }
  //     )
  //     .subscribe((resData) => {
  //       console.log(resData);
  //     });
  // }
}
