import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class ModalComponent implements OnInit {
  closeResult!: string;

  @Input() title!: string;
  @Input() rowData: any;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.rowData ? this.rowData.id : '', [Validators.required]],
      name: [this.rowData ? this.rowData.name : '', [Validators.required]],
      sku: [this.rowData ? this.rowData.sku : '', [Validators.required]],
      price: [this.rowData ? this.rowData.price : '', [Validators.required]],
    });
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
    this.apiService.addProduct(
      this.form.value.id,
      this.form.value.name,
      this.form.value.sku,
      this.form.value.price
    );

    this.form.reset();
  }
}
