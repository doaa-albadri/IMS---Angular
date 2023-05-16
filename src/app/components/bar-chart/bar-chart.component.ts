import { Component, ViewChild, inject } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  private _apiService = inject(ApiService);

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  chartData$ = this._apiService.fetchProfitsData().pipe(map((res: any) => res));

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  getBarChartData(chartData: any) {
    return {
      labels: chartData.labels,
      datasets: [
        {
          data: chartData.datasets[0].data,
          label: chartData.datasets[0].label,
        },
        {
          data: chartData.datasets[1].data,
          label: chartData.datasets[1].label,
        },
      ],
    };
  }
}
