import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/Group';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {


  group: Group = {id: '', name: ''};
  indx = 3;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }

  addGroup() {
    this.group.id = String(this.indx);
    this.groupService.addGroup(this.group);
    this.indx += 1;
  }
}
