import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Vehicle } from '../interfaces/vehicle/vehicle';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private readonly apiUrl = environment.apiUrl;

    // Mock data matching the Vehicle interface exactly
    private readonly mockVehicles: Vehicle[] = [
        {
            vehicleId: '1',
            type: 'SUV',
            useOfVehicle: 'Personal',
            derivative: 'Premium',
            registrationDate: '2023-01-15',
            kilometers: 15000,
            description: 'Spacious SUV with excellent fuel efficiency and modern features',
            ecoLabel: 'A',
            numberOfDoors: 5,
            transmissionType: 'Automatic',
            fuelIcon: 'gasoline',
            visitCounter: 45,
            dealerLink: 'https://dealer.example.com/vehicle/1',
            year: 2023,
            price: 35000,
            supplierWebsiteUrl: 'https://supplier.example.com',
            supplierInternalCode: 'SUV-2023-001',
            createdBy: 'admin',
            createdAt: '2023-01-10T10:00:00Z',
            updatedBy: 'admin',
            updatedAt: '2023-01-10T10:00:00Z',
            isActive: true,
            photos: [
                {
                    photoId: 'photo1',
                    vehicle: '1',
                    photoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 1,
                    description: 'Front view of the SUV'
                },
                {
                    photoId: 'photo2',
                    vehicle: '1',
                    photoUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 2,
                    description: 'Interior view of the SUV'
                }
            ]
        },
        {
            vehicleId: '2',
            type: 'Sedan',
            useOfVehicle: 'Business',
            derivative: 'Executive',
            registrationDate: '2022-08-20',
            kilometers: 25000,
            description: 'Luxury sedan with advanced safety features and comfort',
            ecoLabel: 'B',
            numberOfDoors: 4,
            transmissionType: 'Manual',
            fuelIcon: 'diesel',
            visitCounter: 72,
            dealerLink: 'https://dealer.example.com/vehicle/2',
            year: 2022,
            price: 28000,
            supplierWebsiteUrl: 'https://supplier.example.com',
            supplierInternalCode: 'SED-2022-002',
            createdBy: 'manager',
            createdAt: '2022-08-15T14:30:00Z',
            updatedBy: 'manager',
            updatedAt: '2022-08-15T14:30:00Z',
            isActive: true,
            photos: [
                {
                    photoId: 'photo3',
                    vehicle: '2',
                    photoUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 1,
                    description: 'Side view of the sedan'
                },
                {
                    photoId: 'photo4',
                    vehicle: '2',
                    photoUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 2,
                    description: 'Rear view of the sedan'
                }
            ]
        },
        {
            vehicleId: '3',
            type: 'Hatchback',
            useOfVehicle: 'Personal',
            derivative: 'Sport',
            registrationDate: '2024-02-10',
            kilometers: 5000,
            description: 'Compact hatchback perfect for city driving with sporty design',
            ecoLabel: 'A+',
            numberOfDoors: 3,
            transmissionType: 'Automatic',
            fuelIcon: 'electric',
            visitCounter: 23,
            dealerLink: 'https://dealer.example.com/vehicle/3',
            year: 2024,
            price: 22000,
            supplierWebsiteUrl: 'https://supplier.example.com',
            supplierInternalCode: 'HB-2024-003',
            createdBy: 'admin',
            createdAt: '2024-02-05T09:15:00Z',
            updatedBy: 'admin',
            updatedAt: '2024-02-05T09:15:00Z',
            isActive: true,
            photos: [
                {
                    photoId: 'photo5',
                    vehicle: '3',
                    photoUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 1,
                    description: 'Front view of the hatchback'
                },
                {
                    photoId: 'photo6',
                    vehicle: '3',
                    photoUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    ordering: 2,
                    description: 'Dashboard view of the hatchback'
                }
            ]
        }
    ];

    constructor(private http: HttpClient) {}

    getVehicles(): Observable<Vehicle[]> {
        // Return mock data instead of HTTP call
        return of(this.mockVehicles);
        
        // Uncomment below line when backend is working
        // return this.http.get<Vehicle[]>(`${this.apiUrl}/v1/vehicles`);
    }

    getVehicleById(id: string): Observable<Vehicle> {
        // Return mock data for specific vehicle
        const vehicle = this.mockVehicles.find(v => v.vehicleId === id);
        if (vehicle) {
            return of(vehicle);
        }
        
        // Return first vehicle as fallback
        return of(this.mockVehicles[0]);
        
        // Uncomment below line when backend is working
        // return this.http.get<Vehicle>(`${this.apiUrl}/v1/vehicles/${id}`);
    }
}
