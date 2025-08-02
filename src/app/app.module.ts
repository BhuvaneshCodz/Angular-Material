import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { BrowserModule } from '@angular/platform-browser';
 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { UserDtlViewComponent } from './dialog-components/user-dtl-view/user-dtl-view.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingInterceptor } from './core/Interceptors/spinner';
import { SharedModule } from './core/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDtlViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    CdkTableModule,
    MatIconModule,
    ReactiveFormsModule
  ], 
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }