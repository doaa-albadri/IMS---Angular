import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sidebarExpanded = true;

  cardData: { title: string; stat: number }[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchCardData();
  }

  fetchCardData() {
    this.apiService.fetchStats().subscribe(
      (res: any) => {
        this.cardData = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // onAddData() {
  //   this.apiService.addData();
  // }
}
