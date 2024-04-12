import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CameraService} from "../../services/camera.service";

@Component({
  selector: 'app-add-profile-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-profile-page.component.html',
  styleUrl: './add-profile-page.component.css'
})
export class AddProfilePageComponent {
  router = inject(Router);
  builder = inject(FormBuilder);
  imgsrc= localStorage.getItem('userProfileImage') ||"";
  cameraService = inject(CameraService);
  constructor() {
    if(this.imgsrc ==""){
      this.imgsrc = "../../assets/img/user.png";
    }
  }

  ProfileForm = this.builder.group({
    _name: ['', [Validators.required,]],
    _email: ['', [Validators.required, Validators.email]],
    _DOB:['', [Validators.required, this.DOBValidator]]
  })
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
  onCreateClick(){
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
