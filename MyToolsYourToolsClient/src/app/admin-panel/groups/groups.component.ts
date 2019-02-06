import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Group } from '../../models/Group';
import { GroupService } from '../../services/group.service';
import { UserGroupService } from '../../services/user-group.service';
import { UserGroup } from '../../models/UserGroup';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  @ViewChild(PaginationComponent) pagination: PaginationComponent;

  searchQueryEmitter = new EventEmitter<string>();

  isMyGroupsActive: boolean;

  currentUserId: string;

  allGroups: Group[];
  userGroups: Group[];
  activeGroups: Group[];
  searchedGroups: Group[] = [];

  constructor(
    private groupService: GroupService,
    private userGroupService: UserGroupService
  ) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
    this.isMyGroupsActive = true;
    this.initGroups();
  }

  initGroups() {
    this.groupService.getGroups().pipe(
      map(g => this.allGroups = g)
    ).subscribe();
    this.groupService.getUserGroups(this.currentUserId).pipe(
      map(ug => this.userGroups = ug),
      tap(_ => this.toggleGroups(this.isMyGroupsActive)) // provides async refresh list of viewed groups
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
    this.pagination.refreshPagination(this.searchedGroups.length);
  }

  checkIfCanJoinGroup(groupId: string) {
    return this.userGroups.map(g => g.id).includes(groupId) && !this.isMyGroupsActive;
  }

  joinGroup(groupId: string) {
    this.userGroupService.joinGroup(new UserGroup(this.currentUserId, groupId))
        .pipe(
          tap(_ => {
            this.initGroups(); // refresh async
            this.toggleGroups(true); // toggle to my groups
          }) )
        .subscribe();
  }

  leaveGroup(groupId: string) {
    this.userGroupService.leaveGroup(new UserGroup(this.currentUserId, groupId))
        .pipe(
          tap(_ => {
            this.initGroups(); // refresh async
            this.toggleGroups(true); // toggle to my groups
          }) )
        .subscribe();
  }

  onKey(event: any) {
    const searchQuery = event.target.value;
    if (searchQuery) {
      this.searchedGroups = this.activeGroups.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      this.searchedGroups = this.activeGroups;
    }
    this.pagination.refreshPagination(this.searchedGroups.length);
  }

  onCreateGroup(createdGroup: Group) {
    if (createdGroup != null) {
      // join newly created group
      this.joinGroup(createdGroup.id);
    }
  }
}
