import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmSendDataComponent} from "../modal-confirm-send-data/modal-confirm-send-data.component";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnChanges {
  @Input() sentence: any;
  @Input() result: any;
  @Output() outputResponseEvent = new EventEmitter<any>();

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sentence'].currentValue) {
      this.sentence = changes['sentence'].currentValue;
    }
  }

  onClickSend() {
    if (this.result.length > 0) {
      const confirmSendDataModalRef = this.modalService.open(ModalConfirmSendDataComponent, {centered: true});
      confirmSendDataModalRef.componentInstance.result = this.result;
      confirmSendDataModalRef.result.then(response => {
          this.outputResponseEvent.emit(response);
        }, () => {
          this.outputResponseEvent.emit('');
        }
      )
    }
  }
}
