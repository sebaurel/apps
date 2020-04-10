import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEtapesComponent } from './modal-etapes.component';

describe('ModalEtapesComponent', () => {
  let component: ModalEtapesComponent;
  let fixture: ComponentFixture<ModalEtapesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEtapesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEtapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
