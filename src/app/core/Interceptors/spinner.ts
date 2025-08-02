// loading.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { GlobalService } from '../services/global.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private spinner: GlobalService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(req).pipe(
            finalize(() => this.spinner.hide())
        );
    }
} 
