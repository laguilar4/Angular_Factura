import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { LoginComponent } from './components/login/login.component';
import { DeveloperComponent } from './components/developer/developer.component';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS }  from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeveloperComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true
  },
  { 
    provide: JWT_OPTIONS, useValue: JWT_OPTIONS 
  },
  JwtHelperService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
