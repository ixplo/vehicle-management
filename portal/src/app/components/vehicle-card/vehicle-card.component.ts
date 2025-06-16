import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { Vehicle } from '../../interfaces/vehicle/vehicle';

@Component({
    selector: 'app-vehicle-card',
    imports: [CommonModule, RouterLink, CardModule, ButtonModule, BadgeModule],
    templateUrl: './vehicle-card.component.html',
    styleUrl: './vehicle-card.component.scss'
})
export class VehicleCardComponent {
    @Input() vehicle!: Vehicle;

    formatPrice(price: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    formatKilometers(km: number): string {
        return new Intl.NumberFormat('en-US').format(km) + ' km';
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });
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
