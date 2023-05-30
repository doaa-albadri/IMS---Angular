import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

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
      labels: [chartData[0].title, chartData[1].title, chartData[2].title],
      datasets: [
        { data: chartData[0].data },
        { data: chartData[1].data },
        { data: chartData[2].data },
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
