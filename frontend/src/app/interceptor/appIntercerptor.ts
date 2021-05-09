
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,  HttpResponse,
  HttpErrorResponse} from '@angular/common/http';
import { Asset} from '../asset/asset';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {
  }
/**
 * @param req HttpRequest of ivehice interface.
 * @param next HttpHandler.
 * The function sets the httpRequest header's content-type to application/json and
 * Authorization of type api_key to JFg26WuKBjgZ.
 * @return returns request header.
 */
  intercept(req: HttpRequest<Asset>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ headers: req.headers.set('content-type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Authorization', ' api_key JFg26WuKBjgZ') });
    return next.handle(req)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
           let errorMessage = '';
           if (error.error instanceof ErrorEvent){
            // if the error is client-side error
              errorMessage = `Error: ${error.error.message}`;
          }else {
            // if the error is server-side error
              errorMessage = `Error code:  ${error.status}\nMessage:  Access denied! Something went wrong`;
          }
           window.alert(errorMessage);
           return throwError(errorMessage);
        })
      );
  }
}
