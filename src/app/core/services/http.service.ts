import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  get(endPoint: string): Observable<[]> {
    return this.http.get<[]>(this.apiUrl + endPoint);
  }
  
  post(endPoint: string, payload: any): Observable<[]> {
    return this.http.post<[]>(this.apiUrl + endPoint, payload);
  }

  put(endPoint: string, payload: any): Observable<[]> {
    return this.http.put<[]>(this.apiUrl + endPoint + '/' + payload.id, payload);
  }

  delete(endPoint: string, payload: any): Observable<[]> {
    return this.http.delete<[]>(this.apiUrl + endPoint + '/' + payload.id);
  }

}
