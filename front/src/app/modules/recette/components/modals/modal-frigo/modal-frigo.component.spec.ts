import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFrigoComponent } from './modal-frigo.component';

describe('ModalFrigoComponent', () => {
  let component: ModalFrigoComponent;
  let fixture: ComponentFixture<ModalFrigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFrigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFrigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
