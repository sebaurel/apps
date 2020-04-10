import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRecetteComponent } from './print-recette.component';

describe('PrintRecetteComponent', () => {
  let component: PrintRecetteComponent;
  let fixture: ComponentFixture<PrintRecetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintRecetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
