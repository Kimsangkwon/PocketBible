import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ScripturepageComponent} from "./scripturepage/scripturepage.component";
import {CalendarpageComponent} from "./calendarpage/calendarpage.component";
import {MeditationpageComponent} from "./meditationpage/meditationpage.component";
import {SettingspageComponent} from "./settingspage/settingspage.component";
import {FriendspageComponent} from "./friendspage/friendspage.component";
import {ProfilepageComponent} from "./profilepage/profilepage.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";

export const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "scripture", component: ScripturepageComponent},
  {path: "calendar", component: CalendarpageComponent},
  {path: "meditation", component: MeditationpageComponent},
  {path: "settings", component: SettingspageComponent},
  {path: "friends", component: FriendspageComponent},
  {path: "profile", component: ProfilepageComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "**", component: ErrorpageComponent},

];
