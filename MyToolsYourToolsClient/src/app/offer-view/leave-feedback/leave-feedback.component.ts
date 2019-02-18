import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Opinion } from '../../models/Opinion';
import { OpinionService } from '../../services/opinion.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/User';
import { OfferStatus } from '../../enums/OfferStatus';
import { UserService } from '../../services/user.service';

declare var $: any;

@Component({
  selector: 'app-leave-feedback',
  templateUrl: './leave-feedback.component.html',
  styleUrls: ['./leave-feedback.component.css']
})
export class LeaveFeedbackComponent implements OnInit {

  @Output() sentOpinion = new EventEmitter<Opinion>();
  @Input() borrower: User;

   currentUserId: string;

  opinion: Opinion = {id: '', message: '', ratedUserId: '', ratingUserId: ''};

  constructor(private opinionService: OpinionService, private alertService: AlertService, private userService: UserService) { }


  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');

  }

  leaveFeedback(){
    this.opinion.ratedUserId = this.borrower.id;
    this.opinion.ratingUserId = this.currentUserId;
    this.opinionService.addOpinion(this.opinion).subscribe(
      result => {
        this.alertService.success('Twoja opinia została wysłana');
        $('#leaveFeedbackModal').modal('hide');
        this.sentOpinion.emit(result);
        this.userService.announceUserUpdate(true);
      },
      error => {
        this.alertService.error(error.error);
        this.sentOpinion.emit(null);
      }
    );

  }

}
