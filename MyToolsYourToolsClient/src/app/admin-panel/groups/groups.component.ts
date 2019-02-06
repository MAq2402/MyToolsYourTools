import { Component, OnInit, EventEmitter } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Group } from '../../models/Group';
import { GroupService } from '../../services/group.service';
import { UserGroupService } from '../../services/user-group.service';
import { UserGroup } from '../../models/UserGroup';

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

  // PAGINATION vars
  fromIndex = 0;
  stepIndex = 5;
  groupsCount = 0;
  nextButtonDisabled = false;
  prevButtonDisabled = true;

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
    this.displayGroupsFromZeroIndex();
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
    this.displayGroupsFromZeroIndex();
  }

  onCreateGroup(createdGroup: Group) {
    if (createdGroup != null) {
      // join newly created group
      this.joinGroup(createdGroup.id);
    }
  }


  // PAGINATION
  displayGroupsFromZeroIndex() {
    this.groupsCount = this.searchedGroups.length;
    this.fromIndex = 0;
    this.checkDisabledNavButtons(this.fromIndex);
  }

  nextGroups() {
    const nextStep = this.fromIndex + this.stepIndex;
    if (nextStep < this.groupsCount) {
      this.fromIndex = nextStep;
      this.checkDisabledNavButtons(this.fromIndex);
    }
  }

  prevGroups() {
    const backStep = this.fromIndex - this.stepIndex;
    if (backStep >= 0) {
      this.fromIndex = backStep;
      this.checkDisabledNavButtons(this.fromIndex);
    }
  }

  // TODO: zmienić na lepszą nazwę
  // sprawdzić fixa jak jak rowne stepIndex
  checkDisabledNavButtons(length: number) {
    if (length + this.stepIndex >= this.groupsCount) {
      this.nextButtonDisabled = true;
    } else {
      this.nextButtonDisabled = false;
    }
    if (length - this.stepIndex < 0) {
      this.prevButtonDisabled = true;
    } else {
      this.prevButtonDisabled = false;
    }
  }

  getSlicedGroups(): Group[] {
    return this.searchedGroups.slice(this.fromIndex, this.fromIndex + this.stepIndex);
  }

  showNavButtons() {
    return this.groupsCount > this.stepIndex;
}

}
