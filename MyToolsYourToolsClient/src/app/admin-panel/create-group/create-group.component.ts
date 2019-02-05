import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { AlertService } from '../../services/alert.service';
import { Group } from '../../models/Group';

declare var $: any;

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})

export class CreateGroupComponent implements OnInit {

  @Output() createdGroup = new EventEmitter<Group>();

  group: Group = {id: '', name: ''};

  constructor(
    private groupService: GroupService,
    private alertService: AlertService) { }

  ngOnInit() {}

  addGroup() {
    this.groupService.addGroup(this.group).subscribe(
      result => {
        this.alertService.success('Grupa utworzona pomyślnie.');
        $('#createGroupModal').modal('hide');
        this.createdGroup.emit(result);
      },
      error => {
        this.alertService.error(error.error);
        this.createdGroup.emit(null);
      }
    );
  }
}
