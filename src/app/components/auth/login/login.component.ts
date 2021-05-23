import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import { SocialAuthService,GoogleLoginProvider,SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  socialUser: SocialUser;
  isLoggedin: boolean ;



  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
      private _auth: AuthService,
      private : SocialAuthService )
      { }




  ngOnInit(): void {  this.loginForm = this.formBuilder.group({
    Email: ['', Validators.required],
    password: ['', Validators.required],

  });

  this.socialAuthService.authState.subscribe((user) => {
    this.socialUser = user;
    this.isLoggedin = (user != null);
    console.log(this.socialUser);
  });

  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }


  get data() { return this.loginForm.controls; }
  loginUser(){
    this._auth.loginUser(this.loginForm)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    } else if (this.data.Email.value == localStorage.getItem("Email") && this.data.password.value == localStorage.getItem("password")) {
      this.router.navigate(['/home']);
    } else {
      this.submitted = true;
    }
  }

}
