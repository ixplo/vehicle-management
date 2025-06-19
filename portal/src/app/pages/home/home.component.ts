import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle/vehicle';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterLink, ButtonModule, VehicleCardComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    vehicles: Vehicle[] = [];
    loading = true;

    constructor(private vehicleService: VehicleService) {}

    ngOnInit(): void {
        this.vehicleService.getVehicles().subscribe((vehicles) => {
            this.vehicles = vehicles;
            this.loading = false;
            console.log('Loaded vehicles:', vehicles);
        });
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    formatKilometers(km: number): string {
        return new Intl.NumberFormat('en-US').format(km) + ' km';
    }

    getEcoLabelSeverity(ecoLabel: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
        switch (ecoLabel) {
            case 'A++':
            case 'A+':
                return 'success';
            case 'A':
                return 'info';
            case 'B':
                return 'warn';
            default:
                return 'danger';
        }
    }
}
