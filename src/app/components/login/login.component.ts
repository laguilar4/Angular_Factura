import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(public fb: FormBuilder, private loginSVC: LoginService, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  public loginForm = this.fb.group({
    username:['', [
      Validators.required,
      Validators.minLength(10)
    ]],
    password:['', [
      Validators.required,
      Validators.minLength(10)
    ]]
  });

  login(){
    this.loginSVC.login(this.loginForm.value).subscribe(
      resp => {
        const { nombre, apellido } = resp;
        this.toastr.success(`Bienvenido ${nombre} ${apellido}`,'Success!');
      }, 
      err =>{
        //console.log(err);
        this.toastr.error('Hubo un error al iniciar sesion.Verifique que haya ingresado bien sus datos','Error!');
      }
      );
    /*
    if(this.tokenRe == undefined){
      this.toastr.error('No puede acceder si no ha verificado que no es un robot','Error!');
    }else{
      this.loginSVC.login(this.loginForm.value).subscribe(
        res => {
          const { role, username } = this.jwtHelper.decodeToken(res);
          this.loginSVC.datauser = {role, username};
          if(role == 1){
            this.router.navigate(['adminhome']);
            }else if(role == 2){
              this.router.navigate(['teacherhome']);
            }else if(role == 3){
              this.router.navigate(['studenthome']);
            }
        }, 
        err => {
          console.log(err);
          this.ErrorMsg = true;
          this.toastr.error('Hubo un error al iniciar sesion.Verifique que haya ingresado bien sus datos','Error!');
        });
    }
    */
    
  };

}
