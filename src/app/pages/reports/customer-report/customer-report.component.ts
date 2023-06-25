import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

interface CardData {
  title: string;
  stat: number;
}

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css'],
})
export class CustomerReportComponent {
  constructor(private apiService: ApiService) {}

  cardData$: CardData[] | any = this.apiService
    .fetchCustomerStats()
    .pipe(map((res: any) => res));

  barChartData$ = this.apiService
    .fetchMonthlyOrders()
    .pipe(map((res: any) => res));

  pieChartData$ = this.apiService.fetchCupons().pipe(map((res: any) => res));

  pieLabels$ = this.pieChartData$.pipe(
    map((labels: any) => labels.map((item: any) => item.title))
  );

  pieStats$ = this.pieChartData$.pipe(
    map((stats: any) => stats.map((item: any) => item.stat))
  );

  combinedPieData$ = combineLatest([this.pieLabels$, this.pieStats$]);
}
