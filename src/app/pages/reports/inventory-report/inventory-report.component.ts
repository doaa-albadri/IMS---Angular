import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
interface CardData {
  title: string;
  stat: number | string;
}

interface PurchaseDetail {
  vendor: string;
  category: string;
  product: string;
  qnty: number;
  productRate: number;
  sellRate: number;
}
@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css'],
})
export class InventoryReportComponent {
  purchaseData: PurchaseDetail[];

  constructor(private apiService: ApiService) {}

  cardData$: CardData[] | any = this.apiService
    .fetchInventoryStats()
    .pipe(map((res: any) => res));

  purchasesData$: PurchaseDetail[] | any = this.apiService
    .fetchPurchases()
    .pipe(map((res: any) => res));

  barChartData$ = this.apiService
    .fetchRevenueData()
    .pipe(map((res: any) => res));
}
