import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ScripturepageComponent} from "./scripturepage/scripturepage.component";
import {CalendarpageComponent} from "./calendarpage/calendarpage.component";
import {MeditationpageComponent} from "./meditationpage/meditationpage.component";
import {SettingspageComponent} from "./settingspage/settingspage.component";
import {FriendspageComponent} from "./friendspage/friendspage.component";
import {ProfilepageComponent} from "./profilepage/profilepage.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";
import {AddMeditationComponent} from "./add-meditation/add-meditation.component";
import {EditMeditationpageComponent} from "./edit-meditationpage/edit-meditationpage.component";

export const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "scripture", component: ScripturepageComponent},
  {path: "calendar", component: CalendarpageComponent},
  {path: "meditations", component: MeditationpageComponent},
  {path: "settings", component: SettingspageComponent},
  {path: "friends", component: FriendspageComponent},
  {path: "profile", component: ProfilepageComponent},
  {path:"addMeditation", component:AddMeditationComponent},
  {path:"editMeditation", component:EditMeditationpageComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "**", component: ErrorpageComponent},

];
