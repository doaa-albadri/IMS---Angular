import { Component, Input } from '@angular/core';
import { ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent {
  @Input() doughnutChartData$: any;

  // Doughnut

  getDoughnutChartData(chartData: any) {
    return {
      labels: chartData.labels,
      datasets: [
        { data: chartData.datasets[0].data },
        { data: chartData.datasets[1].data },
        { data: chartData.datasets[2].data },
      ],
    };
  }

  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
