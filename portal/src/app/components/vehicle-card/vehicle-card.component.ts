import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { Vehicle } from '../../interfaces/vehicle/vehicle';
import { LabelComponent } from './label/label.component';

@Component({
    selector: 'app-vehicle-card',
    imports: [CommonModule, RouterLink, CardModule, ButtonModule, BadgeModule, LabelComponent],
    templateUrl: './vehicle-card.component.html',
    styleUrl: './vehicle-card.component.scss'
})
export class VehicleCardComponent {
    @Input() vehicle!: Vehicle;

    private readonly fallbackImage = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

    /**
     * Get the main image URL from vehicle photos
     */
    getMainImage(): string {
        if (this.vehicle.photos && this.vehicle.photos.length > 0) {
            // Sort by ordering and get the first photo
            const sortedPhotos = this.vehicle.photos.sort((a, b) => a.ordering - b.ordering);
            return sortedPhotos[0].photoUrl;
        }
        return this.fallbackImage;
    }

    /**
     * Handle image loading errors
     */
    onImageError(event: Event): void {
        const img = event.target as HTMLImageElement;
        img.src = this.fallbackImage;
    }

    /**
     * Format price with proper currency
     */
    formatPrice(price: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    /**
     * Format kilometers with proper number formatting
     */
    formatKilometers(km: number): string {
        return new Intl.NumberFormat('en-US').format(km) + ' km';
    }

    /**
     * Format date to show month and year
     */
    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });
    }

    /**
     * Format view counter with proper formatting
     */
    formatViews(views: number): string {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + 'M';
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K';
        }
        return views.toString();
    }

    /**
     * Truncate description to a reasonable length
     */
    truncateDescription(description: string, maxLength: number = 80): string {
        if (!description) return '';
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength).trim() + '...';
    }

    /**
     * Capitalize first letter of a string
     */
    capitalizeFirst(str: string): string {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Get appropriate icon class based on fuel type
     */
    getFuelIconClass(fuelType: string): string {
        const baseClass = 'pi pi-bolt';
        switch (fuelType.toLowerCase()) {
            case 'electric':
                return baseClass + ' electric-icon';
            case 'gasoline':
            case 'petrol':
                return baseClass + ' gasoline-icon';
            case 'diesel':
                return baseClass + ' diesel-icon';
            case 'hybrid':
                return baseClass + ' hybrid-icon';
            default:
                return baseClass;
        }
    }

    /**
     * Get appropriate icon for fuel type
     */
    getFuelIcon(fuelType: string): string {
        switch (fuelType.toLowerCase()) {
            case 'electric':
                return 'pi pi-bolt';
            case 'gasoline':
            case 'petrol':
                return 'pi pi-car';
            case 'diesel':
                return 'pi pi-cog';
            case 'hybrid':
                return 'pi pi-refresh';
            default:
                return 'pi pi-bolt';
        }
    }

    /**
     * Get appropriate severity for fuel type labels (p-tag compatible)
     */
    getFuelSeverity(fuelType: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
        switch (fuelType.toLowerCase()) {
            case 'electric':
                return 'success';
            case 'gasoline':
            case 'petrol':
                return 'warn';
            case 'diesel':
                return 'info';
            case 'hybrid':
                return 'secondary';
            default:
                return undefined;
        }
    }

    /**
     * Get eco label severity for badge styling
     */
    getEcoLabelSeverity(ecoLabel: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
        switch (ecoLabel.toUpperCase()) {
            case 'A++':
            case 'A+':
                return 'success';
            case 'A':
                return 'info';
            case 'B':
                return 'warn';
            case 'C':
                return 'secondary';
            default:
                return 'danger';
        }
    }
}
