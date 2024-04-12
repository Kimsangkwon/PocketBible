import {Component, inject} from '@angular/core';
import {MeditationDALService} from "../../services/meditation-dal.service";
import {ActivePerfRecorder} from "@angular/compiler-cli/src/ngtsc/perf";
import {ActivatedRoute, Router} from "@angular/router";
import {Meditation} from "../../models/Meditation.model";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-meditationpage',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-meditationpage.component.html',
  styleUrl: './edit-meditationpage.component.css'
})
export class EditMeditationpageComponent {
  builder = inject(FormBuilder);
  dal = inject(MeditationDALService);
  activatedRoute = inject(ActivatedRoute);
  meditation: Meditation = new Meditation();
  router = inject(Router);
  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id)
      .then((data)=>{
        this.meditation = data;
        this.MeditationForm.patchValue({
          _title: this.meditation.Title,
          _bible: this.meditation.BibleName,
          _chapter: this.meditation.Chapter,
          _verses: this.meditation.Verse,
          _date: this.meditation.dateOfMeditation,
          _meditation: this.meditation.meditationText
        })
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  MeditationForm = this.builder.group({
    _title:['', [Validators.required]],
    _bible:[''],
    _chapter:[''],
    _verses:[''],
    _date:[''],
    _meditation:['', [Validators.required]],
  });
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
