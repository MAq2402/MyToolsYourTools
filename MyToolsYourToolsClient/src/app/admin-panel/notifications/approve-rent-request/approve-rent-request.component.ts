import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-approve-rent-request',
  templateUrl: './approve-rent-request.component.html',
  styleUrls: ['./approve-rent-request.component.css']
})
export class ApproveRentRequestComponent implements OnInit {

  offerTool: string;
  ownerId: string;
  owner: User;
  borrowerId: string;
  borrower: User;

  constructor(
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserById(this.ownerId).pipe(
      tap(u => {
        this.owner = u;
      })
    ).subscribe();
    this.userService.getUserById(this.borrowerId).pipe(
      tap(u => {
        this.borrower = u;
      })
    ).subscribe();
  }

  rejectRentRequest() {
    this.activeModal.close('rejected');
  }

  approveRentRequest(){
    this.activeModal.close('approved');
  }

  closeModal(){
    this.activeModal.close('closed');
  }

}
