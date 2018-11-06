import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmentaComponent } from './ementa.component';

describe('EmentaComponent', () => {
  let component: EmentaComponent;
  let fixture: ComponentFixture<EmentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
