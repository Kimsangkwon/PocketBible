import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-calendarpage',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './calendarpage.component.html',
  styleUrl: './calendarpage.component.css'
})
export class CalendarpageComponent {
  selectedDate: any;

  constructor(private router: Router) {}

  onDateSelected(date: Date) {
    this.selectedDate = date;
  }

  onNewMeditationClick() {
    console.log(this.selectedDate)
    localStorage.setItem("selectedDate", this.selectedDate)
    this.router.navigate(['/addMeditation']);
  }
}
