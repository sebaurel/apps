import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCommentaireComponent } from './modal-commentaire.component';

describe('ModalCommentaireComponent', () => {
  let component: ModalCommentaireComponent;
  let fixture: ComponentFixture<ModalCommentaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCommentaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
