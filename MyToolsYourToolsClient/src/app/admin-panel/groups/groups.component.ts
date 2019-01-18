import { Component, OnInit } from '@angular/core';

import { Group } from '../../models/Group';
import { GroupService } from '../../services/group.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  isMyGroupsActive: boolean;


  currentUserId: number;
  allGroups: Group[];
  userGroups: Group[];
  activeGroups: Group[];

  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit() {
    // ZAGWARANTOWAĆ ASYNCHRONICZNE POBIERANIE GRUP
    this.currentUserId = 1;
    this.toggleGroups(true);
    this.groupService.getGroups().subscribe(g => this.allGroups = g);
    this.groupService.getUserGroups(this.currentUserId).subscribe(g => this.userGroups = g);
  }

  toggleGroups(myGroupsActivated: boolean) {
    if (myGroupsActivated) {
      this.isMyGroupsActive = true;
      this.activeGroups = this.userGroups;
    } else {
      this.isMyGroupsActive = false;
      // DODAĆ paging, albo to z back-endu pojdzie
      // activeGroups można użyć do obcinania
      this.activeGroups = this.allGroups;
    }
  }

  getActiveGroups() {
    return this.activeGroups;
  }
}
