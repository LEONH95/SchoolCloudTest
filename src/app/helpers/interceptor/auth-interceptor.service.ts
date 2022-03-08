import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginService } from '../../pages/content-pages/login/_services/login.service';
import * as swalFunctions from '../../shared/alerts/alerts.functions';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  public alert = swalFunctions;

  constructor(private loginService: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    const token = this.loginService.token;
    

    if (!token) {
      return next.handle(req);
    }

    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(headers).pipe(
      tap(evt => {
        console.log("evt")
        console.log(evt);
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            // this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
            console.log(err);
            this.alert.TypeError(err.error.error);
          } catch (e) {
            this.alert.TypeError(err.error.message);
          }
          //log error 
        }
        return of(err);
      })
    );

  }
}
