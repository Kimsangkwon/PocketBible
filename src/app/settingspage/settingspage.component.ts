import {Component, inject} from '@angular/core';
import {BibledatabaseService} from "../../services/bibledatabase.service";
import {FriendDALService} from "../../services/firend-dal.service";
import {MeditationDALService} from "../../services/meditation-dal.service";

@Component({
  selector: 'app-settingspage',
  standalone: true,
  imports: [],
  templateUrl: './settingspage.component.html',
  styleUrl: './settingspage.component.css'
})
export class SettingspageComponent {
  Bibledatabase = inject(BibledatabaseService);
  friendDal = inject(FriendDALService);
  meditationDal = inject(MeditationDALService);
  onCreateDatabaseClick() {
    this.Bibledatabase.initDatabase();
  }
  onClearDatabaseClick(){
    const result = confirm("Really want to delete all record?");
    if(result){
      localStorage.clear();
      this.friendDal.deleteAll().then((data)=>{
        console.log(data);
      }).catch((e)=>{
        console.log(e);
      });
      this.meditationDal.deleteAll().then((data)=>{
        console.log(data);
      }).catch((e)=>{
        console.log(e);
      });
      alert("all records successfully deleted");

    }

  }
}
