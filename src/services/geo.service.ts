import {Injectable} from '@angular/core';
declare const H: any;

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private geocoder: any;
  private platform: any;

  constructor() {
    this.platform = new H.service.Platform({
      apikey: 'aKCnpBJYnLOSPRUd2RDaIonNvhX2sLSRz61Vnmm8OKE'
    });
    this.geocoder = this.platform.getSearchService();
  }


  getCurrentLocation(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position: any) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      }, (e) => {
        reject({code: e.code, message: e.message})
      }, {
        timeout: 1000,
        maximumAge: 0,
        enableHighAccuracy: true
      });
    });
  }
  geocode(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      this.geocoder.geocode({ q: address }, result => {
        resolve(result);
      });
    });
  }
}
