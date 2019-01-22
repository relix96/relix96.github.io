import { Injectable, Input, ComponentFactoryResolver } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class NgModalService {
    constructor(private ngbModal: NgbModal,
                private componentFactoryResolver: ComponentFactoryResolver) {}

  showDefaultModalComponent(theComponent: any, headerText: any, bodyText: any) {
    const componenetFactory = this.componentFactoryResolver.resolveComponentFactory(theComponent);
    const modalRef = this.ngbModal.open(theComponent);
    modalRef.componentInstance.bodyText = bodyText;
    modalRef.componentInstance.headerText = headerText;
    return modalRef;
  }

  
  showDefaultModalComponentWithCancelButton(theComponent: any, headerText: any, bodyText: any) {
    const componenetFactory = this.componentFactoryResolver.resolveComponentFactory(theComponent);
    const modalRef = this.ngbModal.open(theComponent);
    modalRef.componentInstance.bodyText = bodyText;
    modalRef.componentInstance.headerText = headerText;
    modalRef.componentInstance.showCancelButton = true;
    return modalRef;
  }

}