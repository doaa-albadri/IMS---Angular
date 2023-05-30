import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

interface CardData {
  title: string;
  stat: number | string;
}
@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css'],
})
export class SalesReportComponent {
  cardData: CardData[] = [];

  constructor(private apiService: ApiService) {}

  doughnutChartData$ = this.apiService
    .fetchSalesTypesData()
    .pipe(map((res: any) => res));

  barChartData$ = this.apiService
    .fetchRevenueData()
    .pipe(map((res: any) => res));

  cardData$: CardData[] | any = this.apiService
    .fetchSalesStats()
    .pipe(map((res: any) => res));
}
