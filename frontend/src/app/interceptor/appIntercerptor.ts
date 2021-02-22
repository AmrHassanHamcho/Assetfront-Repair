
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/';
import {IVehicle} from '../search/IVehicle';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<IVehicle>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ headers: req.headers.set('content-type', 'application/json') });
    req = req.clone({ headers: req.headers.set('api_key', 'JFg26WuKBjgZ') });
    req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin',
        'http://localhost:4200') });


/*

    req = req.clone({ headers: req.headers.set('x-content-type-options', 'nosniff') });
    req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', 'http://localhost:4200') });
    req = req.clone({ headers: req.headers.set('Vary', 'Access-Control-Request-Method') });
    req = req.clone({ headers: req.headers.append('Vary', 'origin') });
    req = req.clone({ headers: req.headers.append('Vary', 'Access-Control-Request-Headers') });
    req = req.clone({ headers: req.headers.append(      'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8') });




   // req = req.clone({ headers: req.headers.append('Access-Control-Allow-origin', 'http://localhost:4200/') });
    req = req.clone({ headers: req.headers.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers,API-KEY') });
    req = req.clone({ headers: req.headers.set(  'X-Requested-With', 'HttpClient') });
    req = req.clone({ headers: req.headers.set(  'x-content-type-options', 'nosniff') });


    req = req.clone({ headers: req.headers.set(  'Accept-Encoding', 'gzip, deflate, br') });
*/





    console.log(req.headers.get('content-type'));
    return next.handle(req);
  }
/*
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authRequest = req.clone({
        setHeaders: {
          api_key: 'JFg26WuKBjgZ',
          accept: 'application/json',
          'Access-Control-Allow-Origin' : 'http://localhost:4200',
          'X-Requested-With': 'HttpClient'

        }

      });
      console.log(authRequest);

      return next.handle(authRequest);
    }*/
}
