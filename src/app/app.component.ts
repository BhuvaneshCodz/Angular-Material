import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalService } from './core/services/global.service';

@Component({
  selector: 'app-root',
  // standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Client-side';
  isLoading: any

  constructor(private spinner: GlobalService,
    private cdRef: ChangeDetectorRef
  ) {
    this.isLoading = this.spinner.isLoading
    this.spinner.isLoading.subscribe((value) => {
      setTimeout(() => {
        this.isLoading = value;
        this.cdRef.detectChanges();
      });
    });

  }
}
