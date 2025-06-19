import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';

import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle/vehicle';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    InputTextarea,
    ButtonModule,
    CheckboxModule,
    ToastModule,
    ProgressSpinnerModule,
    DividerModule
  ],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss',
  providers: [MessageService]
})
export class AddVehicleComponent implements OnInit {
  vehicleForm!: FormGroup;
  loading = false;

  // Dropdown options
  vehicleTypes = [
    { label: 'SUV', value: 'SUV' },
    { label: 'Sedan', value: 'Sedan' },
    { label: 'Hatchback', value: 'Hatchback' },
    { label: 'Coupe', value: 'Coupe' },
    { label: 'Convertible', value: 'Convertible' },
    { label: 'Wagon', value: 'Wagon' },
    { label: 'Truck', value: 'Truck' },
    { label: 'Van', value: 'Van' }
  ];

  useOfVehicleOptions = [
    { label: 'Private', value: 'Private' },
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Fleet', value: 'Fleet' }
  ];

  ecoLabels = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' },
    { label: 'ECO', value: 'ECO' }
  ];

  transmissionTypes = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Automatic', value: 'Automatic' },
    { label: 'CVT', value: 'CVT' },
    { label: 'Semi-Automatic', value: 'Semi-Automatic' }
  ];

  fuelTypes = [
    { label: 'Gasoline', value: 'gasoline' },
    { label: 'Diesel', value: 'diesel' },
    { label: 'Electric', value: 'electric' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'Petrol', value: 'petrol' }
  ];

  doorOptions = [
    { label: '2 doors', value: 2 },
    { label: '3 doors', value: 3 },
    { label: '4 doors', value: 4 },
    { label: '5 doors', value: 5 }
  ];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.vehicleForm = this.fb.group({
      type: ['', Validators.required],
      useOfVehicle: ['Private', Validators.required],
      registrationDate: [new Date(), Validators.required],
      kilometers: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      ecoLabel: ['A', Validators.required],
      numberOfDoors: [4, [Validators.required, Validators.min(2), Validators.max(5)]],
      transmissionType: ['', Validators.required],
      fuelType: ['', Validators.required],
      dealerLink: [''],
      visitCounter: [''],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear() + 1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      supplierWebsiteUrl: [''],
      supplierInternalCode: [''],
      isActive: [true],
      photos: this.fb.array([this.createPhotoFormGroup()])
    });
  }

  createPhotoFormGroup(): FormGroup {
    return this.fb.group({
      photoUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      ordering: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  get photosFormArray(): FormArray {
    return this.vehicleForm.get('photos') as FormArray;
  }

  addPhotoField(): void {
    this.photosFormArray.push(this.createPhotoFormGroup());
  }

  removePhotoField(index: number): void {
    if (this.photosFormArray.length > 1) {
      this.photosFormArray.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      this.loading = true;
      
      const formValue = { ...this.vehicleForm.value };
      
      // Format the registration date
      if (formValue.registrationDate instanceof Date) {
        formValue.registrationDate = formValue.registrationDate.toISOString().split('T')[0];
      }
      
      // Remove empty photo entries
      formValue.photos = formValue.photos.filter((photo: any) => photo.photoUrl.trim() !== '');

      this.vehicleService.addVehicle(formValue).subscribe({
        next: (response: Vehicle) => {
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Vehicle added successfully!'
          });
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error: any) => {
          this.loading = false;
          console.error('Error adding vehicle:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add vehicle. Please try again.'
          });
        }
      });
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.'
      });
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.vehicleForm.controls).forEach(field => {
      const control = this.vehicleForm.get(field);
      control?.markAsTouched({ onlySelf: true });
      
      if (control instanceof FormArray) {
        control.controls.forEach((nestedControl) => {
          if (nestedControl instanceof FormGroup) {
            Object.keys(nestedControl.controls).forEach(nestedField => {
              nestedControl.get(nestedField)?.markAsTouched({ onlySelf: true });
            });
          }
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.vehicleForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.vehicleForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['min']) return `${fieldName} must be at least ${field.errors['min'].min}`;
      if (field.errors['max']) return `${fieldName} must be at most ${field.errors['max'].max}`;
      if (field.errors['pattern']) return `${fieldName} must be a valid URL`;
    }
    return '';
  }
}
