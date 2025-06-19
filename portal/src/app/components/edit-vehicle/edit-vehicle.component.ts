import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-vehicle',
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
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.scss',
  providers: [MessageService]
})
export class EditVehicleComponent implements OnInit {
  vehicleForm!: FormGroup;
  loading = false;
  vehicleId: string | null = null;

  // Dropdown options
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
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe(params => {
      this.vehicleId = params.get('id');
      if (this.vehicleId) {
        this.loadVehicleData(this.vehicleId);
      }
    });
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
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear() + 1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      supplierWebsiteUrl: [''],
      supplierInternalCode: [''],
      isActive: [true],
      photos: this.fb.array([this.createPhotoFormGroup()])
    });
  }
  
  loadVehicleData(id: string): void {
    this.loading = true;
    this.vehicleService.getVehicleById(id).subscribe({
      next: (vehicle) => {
        this.vehicleForm.patchValue({
          ...vehicle,
          registrationDate: new Date(vehicle.registrationDate)
        });
        
        // Clear existing photos and add new ones
        this.photosFormArray.clear();
        vehicle.photos.forEach(photo => {
          this.photosFormArray.push(this.fb.group(photo));
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching vehicle data', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load vehicle data.'
        });
      }
    });
  }

  createPhotoFormGroup(): FormGroup {
    return this.fb.group({
      photoId: [null],
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
    if (this.vehicleForm.invalid) {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.'
      });
      return;
    }

    if (!this.vehicleId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No vehicle ID found to update.'
      });
      return;
    }

    this.loading = true;
    const formValue = { ...this.vehicleForm.value };

    if (formValue.registrationDate instanceof Date) {
      formValue.registrationDate = formValue.registrationDate.toISOString().split('T')[0];
    }
    
    formValue.photos = formValue.photos.filter((photo: any) => photo.photoUrl.trim() !== '');

    this.vehicleService.updateVehicle(this.vehicleId, formValue).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Vehicle updated successfully!'
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error updating vehicle:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update vehicle. Please try again.'
        });
      }
    });
  }

  markFormGroupTouched(): void {
    Object.values(this.vehicleForm.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormArray) {
        control.controls.forEach(c => (c as FormGroup).markAllAsTouched());
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
}
