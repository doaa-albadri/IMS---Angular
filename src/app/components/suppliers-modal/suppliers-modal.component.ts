import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-suppliers-modal',
  templateUrl: './suppliers-modal.component.html',
  styleUrls: ['./suppliers-modal.component.css'],
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
export class SuppliersModalComponent implements OnInit {
  closeResult!: string;

  @Input() title!: string;
  @Input() rowData: any;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.rowData ? this.rowData.id : '', [Validators.required]],
      name: [this.rowData ? this.rowData.name : '', [Validators.required]],
      phone: [this.rowData ? this.rowData.phone : '', [Validators.required]],
      address: [
        this.rowData ? this.rowData.address : '',
        [Validators.required],
      ],
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
}
