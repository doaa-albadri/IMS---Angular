import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchStats() {
    return this.http.get('http://localhost:5000/stats');
  }

  fetchOrdersData() {
    return this.http.get('http://localhost:5000/orders');
  }

  fetchProfitsData() {
    return this.http.get('http://localhost:5000/profits');
  }

  fetchProductsData() {
    return this.http.get('http://localhost:5000/products');
  }

  fetchSuppliersData() {
    return this.http.get('http://localhost:5000/suppliers');
  }

  deleteProduct(id: number | string) {
    return this.http.delete(`http://localhost:5000/products/${id}`);
  }

  deleteSupplier(id: number | string) {
    return this.http.delete(`http://localhost:5000/suppliers/${id}`);
  }

  editProduct(id: number, name: string, sku: string, price: number) {
    return this.http.put(`http://localhost:5000/products/${id}`, {
      id: id,
      name: name,
      sku: sku,
      price: price,
    });
  }

  editSupplier(id: number, name: string, phone: number, address: string) {
    return this.http.put(`http://localhost:5000/suppliers/${id}`, {
      id: id,
      name: name,
      phone: phone,
      address: address,
    });
  }

  addProduct(id: number, name: string, sku: string, price: number) {
    return this.http.post<any>('http://localhost:5000/products', {
      id: id,
      name: name,
      sku: sku,
      price: price,
    });
  }

  addSupplier(id: number, name: string, phone: number, address: string) {
    return this.http.post<any>('http://localhost:5000/suppliers', {
      id: id,
      name: name,
      phone: phone,
      address: address,
    });
  }

  fetchSalesStats() {
    return this.http.get('http://localhost:5000/sales-stats');
  }

  fetchRevenueData() {
    return this.http.get('http://localhost:5000/revenue');
  }

  fetchSalesTypesData() {
    return this.http.get('http://localhost:5000/sales-types');
  }

  fetchCustomerStats() {
    return this.http.get('http://localhost:5000/customer-stats');
  }

  fetchMonthlyOrders() {
    return this.http.get('http://localhost:5000/monthly-orders');
  }

  fetchCupons() {
    return this.http.get('http://localhost:5000/cupons');
  }

  fetchInventoryStats() {
    return this.http.get('http://localhost:5000/inventory-stats');
  }

  fetchPurchases() {
    return this.http.get('http://localhost:5000/purchases');
  }
}
