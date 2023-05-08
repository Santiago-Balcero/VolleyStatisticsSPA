import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { labelConstants } from '@constants/labels.constants';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../styles.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  buttonLabel: string = labelConstants.LOGIN_BTN;
  displayModal: boolean = false;
  errorMsg: string = '';

  constructor(private readonly formBuilder: FormBuilder, private authService: AuthService,
    private router: Router) {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    const email = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['main']);
      },
      error: (error) => {
        this.errorMsg = error.error.detail;
        this.displayModal = true;
      }
    });
  }

}
