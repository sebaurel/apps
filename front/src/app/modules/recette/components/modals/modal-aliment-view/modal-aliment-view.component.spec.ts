import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlimentViewComponent } from './modal-aliment-view.component';

describe('ModalAlimentViewComponent', () => {
  let component: ModalAlimentViewComponent;
  let fixture: ComponentFixture<ModalAlimentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAlimentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlimentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
