import {Component, inject} from '@angular/core';
import {Friend} from "../../models/Friend.model";
import {FriendDALService} from "../../services/firend-dal.service";
import {Router} from "@angular/router";
import {Meditation} from "../../models/Meditation.model";

@Component({
  selector: 'app-friendspage',
  standalone: true,
  imports: [],
  templateUrl: './friendspage.component.html',
  styleUrl: './friendspage.component.css'
})
export class FriendspageComponent {
friends: Friend[] = [];
dal =inject(FriendDALService);
router = inject(Router);

constructor() {
  this.showAll();
}
  showAll(){
    this.dal.selectAll().then((data)=>{
      this.friends = data;
    }).catch(e=>{
      console.log(e);
      this.friends = [];
    })
  }
  onModifyClick(friend: Friend) {
    this.router.navigate([`/editFriend/${friend.id}`]);
  }
  onDeleteClick(friend: Friend) {
    this.dal.delete(friend)
      .then((data) => {
        console.log(data);
        this.showAll();
        alert("friend deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      })
  }
  onNewFriendClick(){
    this.router.navigate(['/addFriend']);

  }
}
