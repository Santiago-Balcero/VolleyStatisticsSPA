import { Component, OnInit } from '@angular/core';
import { PlayerService } from '@services/player.service';
import { labelConstants } from '@constants/labels.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@services/modal.service';
import { Type, ToDo } from '@models/modalData.model';

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
    private modalService: ModalService
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
    this.saveAccountChangesBtnLabel = labelConstants.SAVE_BTN;
    this.cancelAccountChangesBtnLabel = labelConstants.CANCEL_BTN;
    this.playerService.getPlayerToUpdate().subscribe(
      (data) => {
        if (data.firstName) {
            console.log('Player data received from observable:', data);
            this.player = data;
            this.loading = false;
        }
        else {
            this.playerService.getPlayerById().subscribe(
                (result) => {
                    console.log('Player data received from new request:', result);
                    this.playerService.editPlayerObservable(result);
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

  editAccount(): void {
    this.setFormValues();
    this.edit = true;
  }

  saveChanges(): void {
    this.modalService.showModal({
        data: this.editForm.value,
        message: 'Save changes?',
        toDo: ToDo.editAccount,
        type: Type.question
    });
    this.cancelChanges();
  }

  cancelChanges(): void {
    this.edit = false;
    this.inputHasChanged = false;
  }

  checkValid(field: string): void {
    if (this.editForm.get(field)?.invalid) {
      console.log(`Field ${field} is invalid`, this.editForm.get(field)?.errors);
    }
  }

  deleteAccount(): void {
    this.modalService.showModal({
        data: {},
        message: 'Are you sure you want to delete your account?',
        toDo: ToDo.deleteAccount,
        type: Type.warning
    });
  }

}
