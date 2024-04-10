import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Friend} from "../../models/Friend.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FriendDALService} from "../../services/firend-dal.service";
import {GeoService} from "../../services/geo.service";
declare const H: any;

@Component({
  selector: 'app-edit-friendpage',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-friendpage.component.html',
  styleUrl: './edit-friendpage.component.css'
})
export class EditFriendpageComponent{
  builder = inject(FormBuilder);
  friend: Friend = new Friend();
  router = inject(Router);
  dal = inject(FriendDALService);
  activatedRoute = inject(ActivatedRoute);
  geoService = inject(GeoService);
  map: any;
  position: any;
  lat:any;
  lon: any;
  FriendForm = this.builder.group({
    _friendName: ['', [Validators.required]],
    _phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
    _email: ['', [Validators.required, Validators.email]],
    _DOB: ['', [Validators.required, this.DOBValidator]],
    _address: ['', [Validators.required]],
    _prayerItem: [''],
    _note: ['']
  });
  setDefaultMap(){
    var platform = new H.service.Platform({
      apikey: 'aKCnpBJYnLOSPRUd2RDaIonNvhX2sLSRz61Vnmm8OKE'
    });
    var maptypes = platform.createDefaultLayers();
    var options = {
      zoom: 15,
      center: {
        lat: this.lat, lng: this.lon
      }
    };
    this.map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.vector.normal.map,
      options
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    const ui = H.ui.UI.createDefault(this.map, maptypes);
  }
  ngOnInit(){
    this.geoService.getCurrentLocation().then((data)=>{
      this.position = data;
      this.lat = data.lat;
      this.lon = data.lon;
      this.setDefaultMap();
    }).catch((e)=>{
      console.log(e);
    });
  }
  onLocateClick(){
    console.log(this.FriendForm.get('_address')?.value);
    // @ts-ignore
    this.geoService.geocode(this.FriendForm.get('_address')?.value).then(data => {
      const locations = data.items;
      this.map.setCenter(locations[0].position);
      this.map.setZoom(15);

      const marker = new H.map.Marker(locations[0].position);
      this.map.addObject(marker);
    }).catch(error => {
      console.error('Geocoding error:', error);
    });
  }
  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id)
      .then((data) => {
        this.friend = data;
        this.FriendForm.patchValue({
          _friendName: this.friend.FriendName,
          _phoneNumber: this.friend.PhoneNumber,
          _email: this.friend.Email,
          _DOB: this.friend.DOB,
          _address: this.friend.Address,
          _prayerItem: this.friend.PrayerItem,
          _note: this.friend.Note
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  phoneNumberValidator(control: AbstractControl){
    let phoneNumber: string = control.value;
    if (phoneNumber =="") {
      return null;
    }
    const pattern = /^\d{3}-?\d{3}-?\d{4}$/;

    if (pattern.test(phoneNumber)) {
      return null;
    } else {
      return {'phoneNumberError': true};
    }
  }
  DOBValidator(control: AbstractControl){
    const dob: string = control.value;
    if (!dob) {
      return null;
    }
    const inputDate = new Date(dob);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (inputDate > currentDate) {
      return {'futureDateError': true};
    }
    return null;
  }
  onUpdateClick(){
    if (this.FriendForm.invalid) {
      alert("Name is required.");
      return;
    }
    this.friend.FriendName = this.FriendForm.get('_friendName')?.value;
    this.friend.PhoneNumber = this.FriendForm.get('_phoneNumber')?.value;
    this.friend.Email = this.FriendForm.get('_email')?.value;
    this.friend.DOB = this.FriendForm.get('_DOB')?.value;
    this.friend.Address = this.FriendForm.get('_address')?.value;
    this.friend.PrayerItem = this.FriendForm.get('_prayerItem')?.value;
    this.friend.Note = this.FriendForm.get('_note')?.value;

    this.dal.update(this.friend)
      .then((data) => {
        console.log(data);
        alert("Record updated successfully");
        this.router.navigate(['/friends']);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
