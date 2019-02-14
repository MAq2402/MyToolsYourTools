import { Component, OnInit } from '@angular/core';
import { Opinion } from '../../models/Opinion';
import { OpinionService } from '../../services/opinion.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-leave-feedback',
  templateUrl: './leave-feedback.component.html',
  styleUrls: ['./leave-feedback.component.css']
})
export class LeaveFeedbackComponent implements OnInit {

  opinion: Opinion = {id: '', message: '', ratedUserId: '', ratingUserId: ''};

  constructor(private opinionService: OpinionService, private alertService: AlertService) { }
  
  
  ngOnInit() {
  }

  sendOpinion(){

    
  }

}
