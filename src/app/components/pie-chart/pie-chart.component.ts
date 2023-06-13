import { Component, Input, ViewChild, inject } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  // @Input() pieChartData$: any;
  @Input() pieLabels$: any;
  @Input() pieStats$: any;
  @Input() combinedPieData$: any;

  private _apiService = inject(ApiService);

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

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
