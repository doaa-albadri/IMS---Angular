import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

interface CardData {
  title: string;
  stat: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sidebarExpanded = true;

  constructor(private apiService: ApiService) {}

  pieChartData$ = this.apiService
    .fetchOrdersData()
    .pipe(map((res: any) => res));

  pieLabels$ = this.pieChartData$.pipe(
    map((labels: any) => labels.map((item: any) => item.title))
  );

  pieStats$ = this.pieChartData$.pipe(
    map((stats: any) => stats.map((item: any) => item.stat))
  );

  combinedPieData$ = combineLatest([this.pieLabels$, this.pieStats$]);

  barChartData$ = this.apiService
    .fetchProfitsData()
    .pipe(map((res: any) => res));

  cardData$: CardData[] | any = this.apiService
    .fetchStats()
    .pipe(map((res: any) => res));
}
