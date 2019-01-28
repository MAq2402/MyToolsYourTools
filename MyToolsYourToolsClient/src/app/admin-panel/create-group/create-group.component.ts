import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/Group';

declare var $: any;

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})

export class CreateGroupComponent implements OnInit {

  @Output() added = new EventEmitter<boolean>();

  group: Group = {id: '', name: ''};

  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }

  addGroup() {
    this.groupService.addGroup(this.group).subscribe(
      result => {
        console.log('Dodano grupe');
        $('#createGroupModal').modal('hide');
        this.added.emit(true);
      },
      error => {
        console.log(error);
        this.added.emit(false);
      }
    );
  }
}
