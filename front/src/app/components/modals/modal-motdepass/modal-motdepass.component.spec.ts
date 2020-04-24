import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMotdepassComponent } from './modal-motdepass.component';

describe('ModalMotdepassComponent', () => {
  let component: ModalMotdepassComponent;
  let fixture: ComponentFixture<ModalMotdepassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMotdepassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMotdepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
