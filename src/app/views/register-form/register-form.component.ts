import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { LabelConstants } from '../../utils/constants/labels.constants';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;

  buttonLabel: string = LabelConstants.REGISTER_BTN;

  categories: Object[] = LabelConstants.PLAYER_CATEGORIES;

  positions: Object[] = LabelConstants.PLAYER_POSITIONS;

  displayModal: boolean = false;

  displayModalBtn: boolean = false;

  modalTitle: string = '';

  modalMsg: string = '';

  constructor(private readonly formBuilder: FormBuilder, private router: Router, private playerService: PlayerService) {
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        lastName:['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        category: ['', [Validators.required]],
        position: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{12,}$')]]
      });
    }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Form data:', this.registerForm.value);
    this.playerService.registerNewPlayer(this.registerForm.value).subscribe({
      next: (result) => {
        console.log(result);
        this.modalTitle = 'Welcome to Volley Statistics';
        this.modalMsg = result;
        this.displayModal = true;
        this.displayModalBtn = true;
      },
      error: (error) => {
        console.log(error);
        this.modalTitle = 'Registration error';
        this.modalMsg = error.error.detail;
        this.displayModal = true;
      }
    });
  }

  checkValid(field: string): void {
    if (this.registerForm.get(field)?.invalid) {
      console.log(`Field ${field} is invalid`, this.registerForm.get(field)?.errors);
    }
  }

  confirm(): void {
    this.router.navigate(['']);
  }

}
