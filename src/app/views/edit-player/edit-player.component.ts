import { Component, OnInit } from '@angular/core';
import { PlayerService } from '@services/player.service';
import { labelConstants } from '@constants/labels.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  
  player: any = null;
  loading: boolean = false;
  editAccountBtnLabel: string = '';
  deleteAccountBtnLabel: string = '';
  saveAccountChangesBtnLabel: string = '';
  cancelAccountChangesBtnLabel: string = '';
  edit: boolean = false;
  editForm: FormGroup;
  categories: Object[] = labelConstants.PLAYER_CATEGORIES;
  positions: Object[] = labelConstants.PLAYER_POSITIONS;
  inputHasChanged: boolean = false;

  constructor(
    private playerService: PlayerService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.editForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        lastName:['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        category: ['', [Validators.required]],
        position: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {
    this.loading = true;
    this.editAccountBtnLabel = labelConstants.EDIT_ACCOUNT_LBL;
    this.deleteAccountBtnLabel = labelConstants.DELETE_ACCOUNT_LBL;
    this.saveAccountChangesBtnLabel = labelConstants.SAVE_ACCOUNT_CHANGES_LBL;
    this.cancelAccountChangesBtnLabel = labelConstants.CANCEL_ACCOUNT_CHANGES_LBL;
    this.playerService.getPlayerToUpdate().subscribe(
      data => {
        if (data.firstName) {
            console.log('Player data received from observable:', data);
            this.player = data;
            this.loading = false;
        }
        else {
            this.playerService.getPlayerById().subscribe(
                data => {
                    console.log('Player data received from new request:', data);
                    this.player = data;
                    this.loading = false;
                }
            )
        }
      }
    )
  }

  setFormValues(): void {
    for (let control of Object.keys(this.editForm.controls)) {
        this.editForm.controls[control].setValue(this.player[control]);
    }
  }

  inputChange(control: string): void {
        if (this.editForm.controls[control].value !== this.player[control]) {
            this.inputHasChanged = true;
        } else {
            this.inputHasChanged = false;
        }

  }

  inputKeyChange(control: string) {
   
  }

  editAccount(): void {
    this.setFormValues();
    this.edit = true;
  }

  saveChanges(): void {
    console.log('Saving changes')
  }

  cancelChanges(): void {
    this.edit = false;
    this.inputHasChanged = false;
    for (let control of Object.keys(this.editForm.controls)) {
        this.editForm.controls[control].setValue('');
    }
  }

  checkValid(field: string): void {
    if (this.editForm.get(field)?.invalid) {
      console.log(`Field ${field} is invalid`, this.editForm.get(field)?.errors);
    }
  }

}
