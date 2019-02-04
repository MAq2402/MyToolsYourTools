
import { Injectable } from '@angular/core';
import { Alert } from '../models/Alert';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject = new Subject<Alert>();

  constructor() { }

  public showAlert (message, type) {
    const alert = new Alert(message, type);
    this.alertSubject.next(alert);
  }

  public error (message) {
    const alert = new Alert(message, 'danger');
    this.alertSubject.next(alert);
  }

  public success (message) {
    const alert = new Alert(message, 'success');
    this.alertSubject.next(alert);
  }

  public info (message) {
    const alert = new Alert(message, 'info');
    this.alertSubject.next(alert);
  }

  public warining (message) {
    const alert = new Alert(message, 'warning');
    this.alertSubject.next(alert);
  }

  public getAlertSubject(): Subject<Alert> {
    return this.alertSubject;
  }
}
