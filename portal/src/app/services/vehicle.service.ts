import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Vehicle } from '../interfaces/vehicle/vehicle';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(`${this.apiUrl}/v1/vehicles`);
    }

    getVehicleById(id: string): Observable<Vehicle> {
        return this.http.get<Vehicle>(`${this.apiUrl}/v1/vehicles/${id}`);
    }
}
