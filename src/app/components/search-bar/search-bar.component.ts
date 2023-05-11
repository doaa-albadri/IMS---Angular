import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Input() searchTerm!: string;
  @Output() search = new EventEmitter<string>();

  onSearch(searchTerm: string) {
    this.search.emit(searchTerm);
  }
}
