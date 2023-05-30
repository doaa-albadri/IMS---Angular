import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchStats() {
    return this.http.get('https://imdep.free.beeceptor.com/stats');
  }

  fetchOrdersData() {
    return this.http.get('https://imdep.free.beeceptor.com/orders');
  }

  fetchProfitsData() {
    return this.http.get('https://imdep.free.beeceptor.com/profits');
  }

  fetchProductsData() {
    return this.http.get('https://imdep.free.beeceptor.com/products');
  }

  fetchSuppliersData() {
    return this.http.get('https://imdep.free.beeceptor.com/suppliers');
  }

  deleteProduct(id: number | string) {
    return this.http.delete(`https://imdep.free.beeceptor.com/products/${id}`);
  }

  deleteSupplier(id: number | string) {
    return this.http.delete(`https://imdep.free.beeceptor.com/suppliers/${id}`);
  }

  editProduct(id: number, name: string, sku: string, price: number) {
    return this.http.put(`https://imdep.free.beeceptor.com/products/${id}`, {
      id: id,
      name: name,
      sku: sku,
      price: price,
    });
  }

  editSupplier(id: number, name: string, phone: number, address: string) {
    return this.http.put(`https://imdep.free.beeceptor.com/suppliers/${id}`, {
      id: id,
      name: name,
      phone: phone,
      address: address,
    });
  }

  addProduct(id: number, name: string, sku: string, price: number) {
    this.http
      .post<any>('https://imdep.free.beeceptor.com/products', {
        id: id,
        name: name,
        sku: sku,
        price: price,
      })
      .subscribe((res) => {
        console.log('RESULT:', res);
      });
  }

  addSupplier(id: number, name: string, phone: number, address: string) {
    this.http
      .post<any>('https://imdep.free.beeceptor.com/products', {
        id: id,
        name: name,
        phone: phone,
        address: address,
      })
      .subscribe((res) => {
        console.log('RESULT:', res);
      });
  }

  fetchSalesStats() {
    return this.http.get('https://imdep.free.beeceptor.com/sales-stats');
  }

  fetchRevenueData() {
    return this.http.get('https://imdep.free.beeceptor.com/revenue');
  }

  fetchSalesTypesData() {
    return this.http.get('https://imdep.free.beeceptor.com/sales-types');
  }
}
