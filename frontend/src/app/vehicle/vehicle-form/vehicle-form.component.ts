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
  vehicle: Vehicle = { make: '', model: '', year: new Date().getFullYear(), price: 0 };
  isEdit = false;

  constructor(
      private route: ActivatedRoute,
      protected router: Router,
      private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.vehicleService.getById(id).subscribe(v => (this.vehicle = v));
    }
  }

  save() {
    const op = this.isEdit
      ? this.vehicleService.update(this.vehicle.id!, this.vehicle)
      : this.vehicleService.create(this.vehicle);

    op.subscribe(() => this.router.navigate(['/vehicles']));
  }

  cancel() {
    this.router.navigate(['/vehicles']);
  }
}