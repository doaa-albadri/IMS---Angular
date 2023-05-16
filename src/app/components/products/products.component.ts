import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  sidebarExpanded = true;
  searchTerm: string = '';
  title!: string;
  selectedRowData: any = {};

  private _apiService = inject(ApiService);
  constructor(private modalService: NgbModal) {}

  productsData$: Product[] | any = this._apiService
    .fetchProductsData()
    .pipe(map((res: any) => res));

  editRow(rowData: any, content: any) {
    this.selectedRowData = rowData;
    // Open the modal here
    this.openVerticallyCentered(content);
  }

  deleteProduct(id: number | string) {
    this._apiService.deleteProduct(id).subscribe(
      (res) => {
        console.log('DELETED SUCCESSFULLY', res);
      },
      (error) => console.log('ERROR', error)
    );
  }

  filterProducts(searchTerm: string): void {
    if (searchTerm) {
      this.productsData$ = this.productsData$.filter((product: Product) => {
        return (
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      console.log(this.productsData$);
    } else {
      console.log('not getting the search term');
      this.productsData$ = this._apiService
        .fetchProductsData()
        .pipe(map((res: any) => res));
    }
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {}
}
