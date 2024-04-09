import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FriendDALService} from "../../services/firend-dal.service";
import {Friend} from "../../models/Friend.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-friendpage',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-friendpage.component.html',
  styleUrl: './add-friendpage.component.css'
})
export class AddFriendpageComponent {
 dal = inject(FriendDALService);
 router = inject(Router);
 friend: Friend = new Friend();
  builder = inject(FormBuilder);

  FriendForm = this.builder.group({
    _friendName: ['', [Validators.required,]],
    _phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
    _email: ['', [Validators.required, Validators.email]],
    _DOB:['', [Validators.required, this.DOBValidator]],
    _prayerItem:[''],
    _note:['']
  })
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
  onAddClick() {
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

    this.dal.insert(this.friend).then((data) => {
      console.log(data);

      alert("Friend added successfully");
    }).catch(e => {
      console.log("error " + e.message)
    });

    this.router.navigate(['/friends']);

  }
}
