import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CameraService} from "../../services/camera.service";

@Component({
  selector: 'app-edit-profile-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-profile-page.component.html',
  styleUrl: './edit-profile-page.component.css'
})
export class EditProfilePageComponent {
  router = inject(Router);
  builder = inject(FormBuilder);
  imgsrc:any;
  cameraService = inject(CameraService);

  ProfileForm = this.builder.group({
    _name: ['', [Validators.required,]],
    _email: ['', [Validators.required, Validators.email]],
    _DOB:['', [Validators.required, this.DOBValidator]]
  })
  constructor() {
    this.ProfileForm.patchValue({
      _name: localStorage.getItem("userName"),
      _DOB: localStorage.getItem("userDOB"),
      _email: localStorage.getItem("userEmail")
    })
    this.imgsrc = localStorage.getItem("userProfileImage")
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
    // @ts-ignore
    localStorage.setItem("userName", this.ProfileForm.get('_name')?.value);
    // @ts-ignore
    localStorage.setItem("userDOB", this.ProfileForm.get('_DOB')?.value);
    // @ts-ignore
    localStorage.setItem("userEmail", this.ProfileForm.get('_email')?.value);
    localStorage.setItem("userProfileImage",this.imgsrc )
    this.router.navigate(['/profile']);
  }
  onCapturePhotoClick() {
    this.cameraService.capturePhoto().then(data=>{
      this.imgsrc = data;
    }).catch(e=>{
      alert(e.toString());
    });
  }

  onLoadFromLibraryClick() {
    this.cameraService.loadPhotoFromLibrary().then(data=>{
      this.imgsrc = data;
    }).catch(e=>{
      alert(e.toString());
    });
  }
}
