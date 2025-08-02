import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public COD_USER_ENDPOINT = 'users'

  constructor(
      private toaster: MatSnackBar
  ) { }

  isLoading = new BehaviorSubject<boolean>(false);

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }

  showToast(msg: any) {
    this.toaster.open(msg, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      // panelClass: ['custom-snackbar']
    });
  }
}
