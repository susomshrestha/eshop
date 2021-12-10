import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private http: HttpClient) {}

  reverseGeocode(lat: any, lng: any): any {
    let params = new HttpParams();
    params = params.set('lat', lat);
    params = params.set('lon', lng);
    params = params.set('format', 'json');
    return this.http.get('https://nominatim.openstreetmap.org/reverse.php', {
      params,
    });
  }
}
