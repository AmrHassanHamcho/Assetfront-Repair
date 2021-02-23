
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/';
import {IVehicle} from '../search/IVehicle';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {
  }
/**
 * @param req HttpRequest of ivehice interface.
 * @param next HttpHandler.
 * The functon sets the httpRequest header's content-type to application/json and
 * Authorization of type api_key to JFg26WuKBjgZ.
 * @return returns request header.
 */
  intercept(req: HttpRequest<IVehicle>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ headers: req.headers.set('content-type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Authorization', ' api_key JFg26WuKBjgZ') });
    return next.handle(req);
  }
}
