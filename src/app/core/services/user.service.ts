import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiEndPoint: any;

  constructor(
    private http: HttpService,
    private glbService: GlobalService
  ) {
    this.apiEndPoint = this.glbService.COD_USER_ENDPOINT
  }

  getAllUsers(): Observable<[]> {
    return this.http.get(this.apiEndPoint);
  }

  createUser(payload: any): Observable<[]> {
    return this.http.post(this.apiEndPoint, payload);
  }

  updateUser(payload: any): Observable<[]> {
    return this.http.put(this.apiEndPoint, payload);
  }

  deleteUser(payload: any): Observable<[]> {
    return this.http.delete(this.apiEndPoint, payload);
  }
}
