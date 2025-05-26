import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../service/vehicle.service';
import { Vehicle } from '../model/vehicle';

@Component({
  selector: 'app-vehicle-form',
  standalone: false,
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {
  vehicle: Vehicle = { make: '', model: '', year: new Date().getFullYear(), price: 0, photoUrl: '' };
  isEdit = false;
  photoUrl: string;

  constructor(
      private route: ActivatedRoute,
      protected router: Router,
      private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.vehicleService.getById(id).subscribe(v => {
        this.vehicle = v;
        this.photoUrl = this.getPhotoUrl();
      });
    }
  }

  save() {
    const op = this.isEdit
      ? this.vehicleService.update(this.vehicle.vehicleId!, this.vehicle)
      : this.vehicleService.create(this.vehicle);

    op.subscribe(() => this.router.navigate(['/vehicles']));
  }

  cancel() {
    this.router.navigate(['/vehicles']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const vehicleId = this.vehicle.vehicleId;
      if (vehicleId) {
        this.vehicleService.uploadPhoto(vehicleId, formData).subscribe({
          next: (url) => {
            this.photoUrl = this.getPhotoUrl();
          },
          error: (err) => console.error('Photo upload failed', err)
        });
      }
    }
  }

  getPhotoUrl(): string {
    return this.vehicle.vehicleId ? this.vehicleService.getPhotoUrl(this.vehicle.vehicleId) : '';
  }
}