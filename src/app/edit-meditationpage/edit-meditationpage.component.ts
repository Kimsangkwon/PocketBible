import {Component, inject} from '@angular/core';
import {MeditationDALService} from "../../services/meditation-dal.service";
import {ActivePerfRecorder} from "@angular/compiler-cli/src/ngtsc/perf";
import {ActivatedRoute, Router} from "@angular/router";
import {Meditation} from "../../models/Meditation.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-meditationpage',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-meditationpage.component.html',
  styleUrl: './edit-meditationpage.component.css'
})
export class EditMeditationpageComponent {
  dal = inject(MeditationDALService);
  activatedRoute = inject(ActivatedRoute);
  meditation: Meditation = new Meditation();
  router = inject(Router);
  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id)
      .then((data)=>{
        this.meditation = data;
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  onUpdateClick() {
    this.dal.update(this.meditation)
      .then((data) => {
        console.log(data);
        alert("Record updated successfully");
        this.router.navigate(['/meditations']);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
