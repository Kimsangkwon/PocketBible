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
   storedVerses = localStorage.getItem("selectedVerses");
   selectedVerses = this.storedVerses && this.storedVerses.trim() !== "" ? JSON.parse(this.storedVerses) : "";
  router = inject(Router);

  meditation : Meditation = new Meditation()
  constructor() {
    this.meditation.BibleName = this.selectedBibleName;
    this.meditation.Chapter = this.selectedChapter;
    this.meditation.Verse = this.selectedVerses;
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
