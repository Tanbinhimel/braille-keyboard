import {Component, Input, OnInit} from '@angular/core';
import {FirestoreDatabaseService} from "../services/database/firestore-database.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-confirm-send-data',
  templateUrl: './modal-confirm-send-data.component.html',
  styleUrls: ['./modal-confirm-send-data.component.scss']
})
export class ModalConfirmSendDataComponent implements OnInit {
  @Input() result: any;
  formSendData: FormGroup;

  constructor(private firestoreDatabaseService: FirestoreDatabaseService, private activeModalService: NgbActiveModal) {
    this.formSendData = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onClickConfirmSendData() {
    const {height, width} = window.screen;
    const data = {
      touchDetails: this.result,
      screenSize: {height, width}
    };

    try {
      const name = this.formSendData.get('name')?.value;
      const response = this.firestoreDatabaseService.setDataToFirestoreDatabase(name, data);
      this.activeModalService.close(response.status);
    } catch (e) {
      this.activeModalService.close('');
    }

  }

  onClickCancel() {
    this.activeModalService.close('');
  }
}
