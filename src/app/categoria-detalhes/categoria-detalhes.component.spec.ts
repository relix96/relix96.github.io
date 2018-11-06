import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaDetalhesComponent } from './categoria-detalhes.component';

describe('CategoriaDetalhesComponent', () => {
  let component: CategoriaDetalhesComponent;
  let fixture: ComponentFixture<CategoriaDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
