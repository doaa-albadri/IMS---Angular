import { Component, ViewChild, inject } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  private _apiService = inject(ApiService);

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  chartData$ = this._apiService
    .fetchOrdersData()
    .pipe(map((res: any) => res['-NQz3JFXxx7JeleMIRr9']));

  labels$ = this.chartData$.pipe(
    map((labels: any) => labels.map((item: any) => item.title))
  );

  stats$ = this.chartData$.pipe(
    map((stats: any) => stats.map((item: any) => item.stat))
  );

  combinedData$ = combineLatest([this.labels$, this.stats$]);

  // Pie

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  getPieChartData(chartData: any) {
    return {
      labels: chartData[0],
      datasets: [
        {
          data: chartData[1],
        },
      ],
    };
  }

  pieChartType: ChartType = 'pie';
  pieChartPlugins = [DatalabelsPlugin];
}
