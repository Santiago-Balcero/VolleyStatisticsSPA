import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  data: any = undefined;
  show: boolean = false;

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.modalService.getModal().subscribe(
      data => {
          if (data) {
          console.log('Data received in modal:', data);
          this.data = data;
          console.log("in if", this.show);
          this.show = true;
        }
      }
    );
  }

  closeModal(): void {
    // Validate if this was comming from register form to login from this method
    // use same validation in template to set log in icon in button
    this.show = false;
    this.data = {};
  }

}
