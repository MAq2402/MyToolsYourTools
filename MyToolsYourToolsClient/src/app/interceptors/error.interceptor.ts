import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError(err => {
          if (err.status === 400) { // when Bad Request
            if (typeof err.error !== 'string') { // when error message is not string
              const errorDetails = Object.values(err.error);
              let errorMessage = '';
              errorDetails.forEach(eD => errorMessage += eD + ' ');
              err.error = errorMessage; // stringify all error messages
            }
          }
          return throwError(err); // rethrow error
        }
      ));
    }
}
