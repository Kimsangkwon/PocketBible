import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Friend} from "../../models/Friend.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FriendDALService} from "../../services/firend-dal.service";

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

  FriendForm = this.builder.group({
    _friendName: ['', [Validators.required]],
    _phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
    _email: ['', [Validators.required, Validators.email]],
    _DOB: ['', [Validators.required, this.DOBValidator]],
    _prayerItem: [''],
    _note: ['']
  });
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
