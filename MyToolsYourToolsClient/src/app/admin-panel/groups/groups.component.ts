import { Component, OnInit, EventEmitter } from '@angular/core';

import { Group } from '../../models/Group';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  searchQueryEmitter = new EventEmitter<string>();

  isMyGroupsActive: boolean;

  currentUserId: number;
  allGroups: Group[];
  userGroups: Group[];
  activeGroups: Group[];
  searchedGroups: Group[];

  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.currentUserId = 1;
    this.groupService.getGroups().subscribe(g => this.allGroups = g);
    this.groupService.getUserGroups(this.currentUserId).subscribe(ug => this.userGroups = ug);
    this.toggleGroups(true);
  }

  toggleGroups(myGroupsActivated: boolean) {
    if (myGroupsActivated) {
      this.isMyGroupsActive = true;
      this.activeGroups = this.userGroups;
    } else {
      this.isMyGroupsActive = false;
      this.activeGroups = this.allGroups;
    }
    this.searchedGroups = this.activeGroups;
  }

  checkIfCanJoinGroup(group: Group) {
    return this.userGroups.includes(group) && !this.isMyGroupsActive;
  }

  onKey(event: any) {
    const searchQuery = event.target.value;
    if (searchQuery) {
      this.searchedGroups = this.activeGroups.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      this.searchedGroups = this.activeGroups;
    }
  }

}
