import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../authentication/services/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

   notExpired: boolean = true;

    constructor(
        private authService: AuthService,
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 ) {
                // auto logout if 401 response returned from api
                this.authService.logOut();
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}