import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css'],
})
export class CustomerReportComponent {
  data = [
    {
      title: 'Customer Satisfaction:',
      stat: '100%',
    },
    { title: 'Number of Orders:', stat: 1000 },
    { title: 'Commission:', stat: 500 },
    { title: 'Returned Customers:', stat: 50 },
  ];

  constructor(private apiService: ApiService) {}

  pieChartData$ = this.apiService
    .fetchSalesTypesData()
    .pipe(map((res: any) => res));

  pieLabels$ = this.pieChartData$.pipe(
    map((labels: any) => labels.map((item: any) => item.title))
  );

  pieStats$ = this.pieChartData$.pipe(
    map((stats: any) => stats.map((item: any) => item.stat))
  );

  combinedPieData$ = combineLatest([this.pieLabels$, this.pieStats$]);
}
