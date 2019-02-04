export class Alert {
  type: string;
  message: string;
  displayTime: number;

  constructor(message, type?) {
    this.message = message;
    this.type = type || 'info';
    switch (this.type) {
      case 'success':
        this.displayTime = 2300;
        break;
      case 'danger':
        this.displayTime = 60000;
        break;
      default:
        this.displayTime = 10000;
        break;
    }
  }
}
