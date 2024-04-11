import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./nav/nav.component";
import {DatabaseService} from "../services/database.service";
import {BibledatabaseService} from "../services/bibledatabase.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PocketBible';
  database = inject(DatabaseService);
  BibleDatabase = inject(BibledatabaseService);
  constructor() {
    this.database.initDatabase()
    this.BibleDatabase.initDatabase()
  }
}
