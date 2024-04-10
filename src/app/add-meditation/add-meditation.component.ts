import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Meditation} from "../../models/Meditation.model";
import {JsonPipe} from "@angular/common";
import {MeditationDALService} from "../../services/meditation-dal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-meditation',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './add-meditation.component.html',
  styleUrl: './add-meditation.component.css'
})
export class AddMeditationComponent {
  dal = inject(MeditationDALService);
   selectedBibleName = localStorage.getItem("selectedBibleName")||"";
  selectedChapter = localStorage.getItem("selectedChapter")||"";
   storedVerses = localStorage.getItem("selectedVerses")||"";

   // @ts-ignore
  selectedDate =this.getLocalDateTimeString(localStorage.getItem("selectedDate"));
   selectedVerses = this.storedVerses && this.storedVerses.trim() !== "" ? JSON.parse(this.storedVerses) : "";
  router = inject(Router);

  meditation : Meditation = new Meditation()
  constructor() {
    this.meditation.BibleName = this.selectedBibleName;
    this.meditation.Chapter = this.selectedChapter;
    this.meditation.Verse = this.selectedVerses;
    this.meditation.dateOfMeditation = this.selectedDate;
  }
  getLocalDateTimeString(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작합니다.
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  onAddClick() {
    this.dal.insert(this.meditation).then((data) => {
      console.log(data);

      alert("Record added successfully");
    }).catch(e => {
      console.log("error " + e.message)
    });
    localStorage.setItem("selectedBibleName", "");
    localStorage.setItem("selectedChapter", "");
    localStorage.setItem("selectedVerses", "");

    this.router.navigate(['/meditations']);

  }
}
