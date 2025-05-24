import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../service/vehicle.service';
import { Vehicle } from '../model/vehicle';

@Component({
  selector: 'app-vehicle-list',
  standalone: false,
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.vehicleService.list(this.page, this.size).subscribe(page => {
      this.vehicles = page.content;
      this.totalPages = page.totalPages;
    });
  }

  next() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.load();
    }
  }

  prev() {
    if (this.page > 0) {
      this.page--;
      this.load();
    }
  }

  delete(id: string) {
    const deletedBy = prompt('Enter your username for deletion');
    if (deletedBy) {
      this.vehicleService.delete(id, deletedBy).subscribe(() => this.load());
    }
  }
}