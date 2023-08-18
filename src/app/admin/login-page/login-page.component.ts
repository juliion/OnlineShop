import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.service';
import { LoginRequest } from 'src/app/common/models/login-request';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  form!:FormGroup;
  submitted = false;

  constructor(
    public auth:AuthService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit(): void {
    if(this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user:LoginRequest = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };

    this.auth.login(user).subscribe(res =>{
      this.form.reset;
      this.router.navigate(['/admin','dashboard']);
      this.submitted = false;
    }, (res) => {
      this.submitted = false;
      console.log(res);
    });

  }

}
