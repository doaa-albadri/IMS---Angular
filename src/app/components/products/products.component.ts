import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  productsData: any[] = [];
  filteredData: any[] = [];

  private _apiService = inject(ApiService);
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.productsData$ = this._apiService.fetchProductsData();
    this.productsData$.subscribe((data) => {
      this.productsData = data;
      this.filteredData = data;
    });
  }

  productsData$: Product[] | any = this._apiService
    .fetchProductsData()
    .pipe(map((res: any) => res));

  filterProducts(searchTerm: string): void {
    this.filteredData = this.productsData.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  downloadPDF() {
    const table: HTMLElement | any = document.getElementById('products-table');

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
      pdf.save('products-table.pdf');
    });
  }

  editRow(rowData: any, content: any) {
    this.selectedRowData = rowData;
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

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
