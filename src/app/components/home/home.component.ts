import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map, tap } from 'rxjs/operators';

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

  fetchCardData = () => {
    this.apiService.fetchData().subscribe(
      (res: any) => {
        this.cardData = res['-NQyvmjiAa_QIg4GYWpo'];
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
