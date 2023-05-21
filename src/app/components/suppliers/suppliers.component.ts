import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  selectedRowData: any = {};
  suppliersData: Supplier[] = [];
  filteredData: Supplier[] = [];

  private _apiService = inject(ApiService);
  constructor(private modalService: NgbModal) {}

  suppliersData$: Supplier[] | any = this._apiService
    .fetchSuppliersData()
    .pipe(map((res: any) => res));

  ngOnInit(): void {
    this.suppliersData$.subscribe((data) => {
      this.suppliersData = data;
      this.filteredData = data;
    });
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

  editRow(rowData: any, content: any) {
    this.selectedRowData = rowData;
    this.openVerticallyCentered(content);
  }

  deleteSupplier(id: number | string) {
    this._apiService.deleteSupplier(id).subscribe(
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
