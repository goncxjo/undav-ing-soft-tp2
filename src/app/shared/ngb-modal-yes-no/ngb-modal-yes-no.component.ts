import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngb-modal-yes-no',
  templateUrl: './ngb-modal-yes-no.component.html',
  styleUrls: ['./ngb-modal-yes-no.component.sass']
})
export class NgbModalYesNoComponent implements OnInit {
  @Input() title;
  @Input() question;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  confirm(value: string) {
    this.activeModal.close(value)
  }
}
