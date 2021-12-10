import { Component, OnInit } from '@angular/core';
import {
  Icon,
  latLng,
  LeafletMouseEvent,
  Map,
  MapOptions,
  Marker,
  tileLayer,
} from 'leaflet';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  map: Map;
  marker: Marker;

  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 12,
    center: latLng(27.713958216010024, 85.3147213729993),
  };

  shipping: string = '';

  constructor(private utility: UtilityService) {}

  ngOnInit(): void {}

  onMapReady(map: Map) {
    this.map = map;
    Icon.Default.imagePath = 'assets/images/leaflet/';
  }

  onMapClick(event: LeafletMouseEvent) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = new Marker(event.latlng);
    this.map.addLayer(this.marker);

    this.utility
      .reverseGeocode(event.latlng.lat, event.latlng.lng)
      .subscribe((res: any) => {
        this.shipping = res.display_name;
        console.log(this.shipping);
      });
    console.log(event);
  }
}
