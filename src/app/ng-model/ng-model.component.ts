import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ng-model',
  template: `
  <div class="modal-header">
  <h3 class="font-32" style="padding-bottom: 0px">{{headerText}}</h3>
  </div>
  <div class="modal-body">
  <p>{{bodyText}}</p>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">OK</button>

  <button type="button" class="btn btn-outline-dark" *ngIf="showCancelButton" (click)="activeModal.dismiss('Cancel')">Cancelar</button>
  </div>
    `,
  styleUrls: ['./ng-model.component.css']
})
export class NgModelComponent {

  @Input() bodyText;
  @Input() headerText;
  @Input() showCancelButton?: boolean;
  constructor(public activeModal: NgbActiveModal) {}

}