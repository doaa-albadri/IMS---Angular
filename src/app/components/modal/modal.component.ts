import { Component, Input } from '@angular/core';
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
export class ModalComponent {
  closeResult!: string;

  @Input() title!: string;

  form!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      price: ['', [Validators.required]],
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
    console.log(this.form.value);
    this.apiService.addProduct(
      this.form.value.id,
      this.form.value.name,
      this.form.value.sku,
      this.form.value.price
    );

    this.form.reset();
  }
}
