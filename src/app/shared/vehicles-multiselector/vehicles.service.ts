import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private baseRoute: string;

  constructor(
    @Inject('BASE_API_URL') baseUrl: string,
    private http: HttpClient
  ) {
    this.baseRoute = '/api/vehicles'
  }

  getVehicles(): Observable<Vehicle[]> {
    const url = `${this.baseRoute}`;
    return this.http.get<Vehicle[]>(url);
  }
}
