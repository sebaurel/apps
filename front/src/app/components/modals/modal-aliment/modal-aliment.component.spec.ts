import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlimentComponent } from './modal-aliment.component';

describe('ModalAlimentComponent', () => {
  let component: ModalAlimentComponent;
  let fixture: ComponentFixture<ModalAlimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAlimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
