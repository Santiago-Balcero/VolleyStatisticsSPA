import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LabelConstants } from '../../utils/constants/labels.constants';
import { AuthService } from '../../services/auth.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { SessionDataService } from 'src/app/services/session-data.service';

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
    this.authService.login(formData).subscribe({
      next: (result) => {
        console.log(result);
        SessionDataService.auth();
        SessionDataService.setToken(result.access_token);
        const tokenInfo: any = jwtDecode(result.access_token);
        SessionDataService.setPlayerId(tokenInfo.sub);
        this.router.navigate(['player']);
      },
      error: (error) => {
        this.errorMsg = error.error.detail;
        this.displayModal = true;
      }
    });
  }

}
