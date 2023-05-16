import { Component } from '@angular/core';
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

  cardData: CardData[] = [];

  constructor(private apiService: ApiService) {}

  cardData$: CardData[] | any = this.apiService
    .fetchStats()
    .pipe(map((res: any) => res));
}
