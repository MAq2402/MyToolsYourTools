import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  currentUserId: string;

  allGroups: Group[];
  userGroups: Group[];
  activeGroups: Group[];
  searchedGroups: Group[] = [];

  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');

    this.groupService.getGroups().pipe(
      map(g => this.allGroups = g)
    ).subscribe();
    this.groupService.getUserGroups(this.currentUserId).pipe(
      map(ug => this.userGroups = ug),
      tap(_ => this.toggleGroups(true))
    ).subscribe();

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

  checkIfCanJoinGroup(groupId: string) {
    return this.userGroups.map(g => g.id).includes(groupId) && !this.isMyGroupsActive;
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
