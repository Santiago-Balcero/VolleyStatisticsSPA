import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LabelConstants } from '../../utils/constants/labels.constants';
import { AuthService } from '../../services/auth.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  buttonLabel: string = LabelConstants.LOGIN_BTN;

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
    localStorage.clear();
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    let formData: FormData = new FormData();
    formData.append('username', this.loginForm.value.username);
    formData.append('password', this.loginForm.value.password);
    this.authService.login(formData).subscribe(
      (result:any) => {
        console.log(result);
        localStorage.setItem('token', result.access_token);
        const tokenInfo: any = jwtDecode(result.access_token);
        localStorage.setItem('playerId', tokenInfo.sub);
        this.router.navigate(['player']);
      },
      (error: any) => {
        this.displayModal = true;
        this.errorMsg = error.error.detail;
      }
    );
  }

}
