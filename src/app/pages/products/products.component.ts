import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  productsData: any[] = [];
  filteredData: any[] = [];
  rowData: any;
  form!: FormGroup;
  isFieldDisabled!: boolean;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  productsData$: Product[] | any = this.apiService
    .fetchProductsData()
    .pipe(map((res: any) => res));

  private updateProductData(): void {
    this.productsData$.subscribe((data) => {
      this.productsData = data;
      this.filteredData = data;
    });
  }

  ngOnInit(): void {
    this.updateProductData();
  }

  get id() {
    return this.form.get('id');
  }
  get name() {
    return this.form.get('name');
  }
  get sku() {
    return this.form.get('sku');
  }
  get price() {
    return this.form.get('price');
  }

  onSubmit(): void {
    if (this.rowData) {
      this.apiService
        .editProduct(
          this.form.value.id,
          this.form.value.name,
          this.form.value.sku,
          this.form.value.price
        )
        .subscribe(() => {
          this.updateProductData();
        });
    } else {
      this.apiService
        .addProduct(
          this.form.value.id,
          this.form.value.name,
          this.form.value.sku,
          this.form.value.price
        )
        .subscribe(() => {
          this.updateProductData();
        });

      this.form.reset();
    }
  }

  editRow(rowData: any, content: any) {
    this.rowData = rowData;

    this.isFieldDisabled = true;
    this.form = this.fb.group({
      id: [this.rowData ? this.rowData.id : '', [Validators.required]],
      name: [this.rowData ? this.rowData.name : '', [Validators.required]],
      sku: [this.rowData ? this.rowData.sku : '', [Validators.required]],
      price: [this.rowData ? this.rowData.price : '', [Validators.required]],
    });

    this.openVerticallyCentered(content);
  }

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

  deleteProduct(id: number | string) {
    this.apiService.deleteProduct(id).subscribe(
      (res) => {
        console.log('DELETED SUCCESSFULLY', res);
        this.updateProductData();
      },
      (error) => console.log('ERROR', error)
    );
  }

  addProduct(content: any) {
    this.isFieldDisabled = false;

    this.form = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });

    this.openVerticallyCentered(content);
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
