import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import { AlertService } from 'src/app/services/alert.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approve-rent-request',
  templateUrl: './approve-rent-request.component.html',
  styleUrls: ['./approve-rent-request.component.css']
})
export class ApproveRentRequestComponent implements OnInit {

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  approveRentRequest(){
  }

}
