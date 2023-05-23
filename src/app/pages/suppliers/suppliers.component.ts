import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Supplier {
  id: number;
  name: string;
  phone: number;
  address: string;
}
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  sidebarExpanded = true;
  searchTerm: string = '';
  title!: string;
  rowData: any = {};
  suppliersData: Supplier[] = [];
  filteredData: Supplier[] = [];
  form!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  suppliersData$: Supplier[] | any = this.apiService
    .fetchSuppliersData()
    .pipe(map((res: any) => res));

  ngOnInit(): void {
    this.suppliersData$.subscribe((data) => {
      this.suppliersData = data;
      this.filteredData = data;
    });
  }

  get id() {
    return this.form.get('id');
  }
  get name() {
    return this.form.get('name');
  }
  get phone() {
    return this.form.get('phone');
  }
  get address() {
    return this.form.get('address');
  }

  onSubmit(): void {
    if (this.rowData) {
      console.log(this.form.value);
      this.apiService
        .editProduct(
          this.form.value.id,
          this.form.value.name,
          this.form.value.phone,
          this.form.value.address
        )
        .subscribe();
    } else {
      this.apiService.addProduct(
        this.form.value.id,
        this.form.value.name,
        this.form.value.phone,
        this.form.value.address
      );

      this.form.reset();
    }
  }

  filterData(searchTerm: string): void {
    this.filteredData = this.suppliersData.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  downloadPDF() {
    const table: HTMLElement | any = document.getElementById('suppliers-table');

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
      pdf.save('suppliers-table.pdf');
    });
  }

  addSupplier(content: any) {
    this.openVerticallyCentered(content);

    this.form = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  editRow(rowData: any, content: any) {
    this.rowData = rowData;
    this.form = this.fb.group({
      id: [this.rowData ? this.rowData.id : '', [Validators.required]],
      name: [this.rowData ? this.rowData.name : '', [Validators.required]],
      phone: [this.rowData ? this.rowData.phone : '', [Validators.required]],
      address: [
        this.rowData ? this.rowData.address : '',
        [Validators.required],
      ],
    });
    this.openVerticallyCentered(content);
  }

  deleteSupplier(id: number | string) {
    this.apiService.deleteSupplier(id).subscribe(
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
