import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = ""
  password: string = ""

  constructor(private toastr: ToastrService, private admin: AdminService,private router:Router) { }

  handleLogin = () => {
    console.log(this.email, this.password)
    if (this.email && this.password) {
      // alert("Login Success")
      const result = this.admin.getAdmin()
      result.subscribe({
        next: (res: any) => {
          console.log(res.email)
          if (this.email == res.email && this.password == res.password) {
            this.toastr.success("Login Successfull!!")
            this.email=""
            this.password=""
            sessionStorage.setItem('admin',JSON.stringify(res))
            this.router.navigateByUrl('home')
          }
          else{
            this.toastr.error("Invalid Email/Password!!")
          }
        },
        error: (err) => {
          console.log(err)
          this.toastr.warning(err)
        }
      })
    }
    else {
      // alert("Login Failed!! invalid email/password").
      this.toastr.error("Login Failed!!  Invalid email/passowrd")
    }
  }

}
