import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Vehicle } from '../interfaces/vehicle/vehicle';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getVehicles(): Observable<Vehicle[]> {
        const params = new HttpParams()
            .set('useOfVehicle', 'Private')
            .set('type', 'SUV');
        return this.http.get<Vehicle[]>(`${this.apiUrl}/v1/vehicles`, { params });
    }

    getVehicleById(id: string): Observable<Vehicle> {
        // // Return mock data for specific vehicle
        // const vehicle = this.mockVehicles.find(v => v.vehicleId === id);
        // if (vehicle) {
        //     return of(vehicle);
        // }
        
        // // Return first vehicle as fallback
        // return of(this.mockVehicles[0]);
        
        // Uncomment below line when backend is working
        return this.http.get<Vehicle>(`${this.apiUrl}/v1/vehicles/${id}`);
    }
}
