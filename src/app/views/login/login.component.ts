import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { labelConstants } from '@constants/labels.constants';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from '@services/modal.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../styles.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  buttonLabel: string = labelConstants.LOGIN_BTN;

  constructor(
    private readonly formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService,
    private menuService: MenuService
    ) {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.menuService.sendMenuData({currentView: 'login'});
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
        console.log('Error:', error.error);
        this.modalService.showModal(error.error, 'error');
      }
    });
  }

}
