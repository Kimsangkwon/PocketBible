import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css'
})
export class ProfilepageComponent {
name: string | null;
DOB: string | null;
email: string | null;
imgsrc: any;
router = inject(Router);
constructor() {
  this.name = localStorage.getItem("userName");
  this.DOB = localStorage.getItem("userDOB");
  this.email = localStorage.getItem("userEmail");
  this.imgsrc = localStorage.getItem("userProfileImage");
}
  onCreateClick(){
    this.router.navigate(['/createProfile']);

  }
  onEditClick(){
    this.router.navigate(['/editProfile']);

  }
}
