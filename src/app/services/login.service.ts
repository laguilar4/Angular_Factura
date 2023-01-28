import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment.prod';
import { HttpClient, HttpErrorResponse  } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { user, dataUser } from '../interfaces/login';
import { map, Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL_API = environment.baseUrl;

  constructor(private http: HttpClient, private jwtHelper : JwtHelperService, private router: Router) { }

  datauser?: dataUser[];
  isAuth():boolean{
    const token = localStorage.getItem('user_token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('user_token')){
      return false;
    }
    return true;
  }

  login(credentials: user):Observable<any>{
    return this.http.post(`${this.URL_API}/login`, credentials).pipe(
    catchError(this.handleError),
    map((resp: any) => 
    {
      localStorage.setItem('user_token',resp['token']);
      const { nombre, apellido, rol } = this.jwtHelper.decodeToken(resp['token']);
      console.log(rol);
      this.router.navigate([rol]);
      return {nombre, apellido};
    }
    ));
  }
  
  logout(){
    Swal.fire({
      title: '¿Esta seguro que desea cerrar la sesion?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {  
      localStorage.clear();
      this.router.navigate(['login']);
      } else if (result.isDenied) {
      }
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ha ocurrido un error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
      `Status Code: ${error.status}`);
      console.log(error.error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
