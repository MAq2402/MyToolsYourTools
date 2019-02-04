import { Component, OnInit } from '@angular/core';
import { debounce } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { Alert } from '../models/Alert';
import { timer } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alert: Alert;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlertSubject().subscribe(alert => this.alert = alert);
    this.alertService.getAlertSubject().pipe(
      debounce(() => timer(this.alert.displayTime))
    ).subscribe(() => this.alert = null);
  }
}
