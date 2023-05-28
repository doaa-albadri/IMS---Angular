import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss'],
})
export class ScatterChartComponent {
  // scatter
  public scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  // public scatterChartLabels: string[] = [
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'Apr',
  //   'May',
  //   'Jun',
  //   'Jul',
  //   'Aug',
  //   'Sep',
  //   'Oct',
  //   'Nov',
  //   'Dec'
  // ];

  public scatterChartData: ChartData<'scatter'> = {
    // labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
          { x: 19, y: 5000 },
          { x: 20, y: 10000 },
          { x: 21, y: 15000 },
          { x: 22, y: 20000 },
          { x: 23, y: 25000 },
        ],
        label: 'Monthly Revenue',
        pointRadius: 10,
      },
    ],
  };
  public scatterChartType: ChartType = 'scatter';

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
