import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sidebarExpanded = true;

  cardData: { title: string; data: number }[] = [
    { title: 'Products', data: 5 },
    { title: 'Orders', data: 10 },
    { title: 'Suppliers', data: 15 },
  ];
}
