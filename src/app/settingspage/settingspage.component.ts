import {Component, inject} from '@angular/core';
import {BibledatabaseService} from "../../services/bibledatabase.service";

@Component({
  selector: 'app-settingspage',
  standalone: true,
  imports: [],
  templateUrl: './settingspage.component.html',
  styleUrl: './settingspage.component.css'
})
export class SettingspageComponent {
  database = inject(BibledatabaseService);
  onCreateDatabaseClick() {
    this.database.initDatabase();
  }
}
