import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../model/vehicle';
import { Page } from '../model/page';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private baseUrl = '/api/v1/vehicles';

  constructor(private http: HttpClient) {}

  list(page = 0, size = 10): Observable<Page<Vehicle>> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    return this.http.get<Page<Vehicle>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}`);
  }

  create(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseUrl, vehicle);
  }

  update(id: string, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/${id}`, vehicle);
  }

  delete(id: string, deletedBy: string): Observable<void> {
    const params = new HttpParams().set('deletedBy', deletedBy);
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { params });
  }

  uploadPhoto(vehicleId: string, formData: FormData): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/${vehicleId}/photo`,
      formData,
      { responseType: 'text' }
    );
  }

  getPhotoUrl(vehicleId: string): string {
    return `${this.baseUrl}/${vehicleId}/photo`;
  }
}