import {Component, inject} from '@angular/core';
import {Meditation} from "../../models/Meditation.model";
import {MeditationDALService} from "../../services/meditation-dal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-meditationpage',
  standalone: true,
  imports: [],
  templateUrl: './meditationpage.component.html',
  styleUrl: './meditationpage.component.css'
})
export class MeditationpageComponent {
  meditations: Meditation[] = [];
  dal = inject(MeditationDALService);
  router = inject(Router);

  constructor() {
    this.showAll();
  }
  showAll(){
    this.dal.selectAll().then((data)=>{
      this.meditations = data;
    }).catch(e=>{
      console.log(e);
      this.meditations = [];
    })
  }
  onModifyClick(meditation: Meditation) {
    this.router.navigate([`/editMeditation/${meditation.id}`]);
  }

  onDeleteClick(meditation: Meditation) {
    this.dal.delete(meditation)
      .then((data) => {
        console.log(data);
        this.showAll();
        alert("meditation deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      })
  }
  onMeditateClick(){
    localStorage.setItem('selectedVerses', "");
    localStorage.setItem('selectedBibleName', "");
    localStorage.setItem('selectedChapter', "");
    this.router.navigate(['/addMeditation']);

  }
}
