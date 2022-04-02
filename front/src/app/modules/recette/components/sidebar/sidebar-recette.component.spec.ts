import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRecetteComponent } from './sidebar-recette.component';

describe('SidebarRecetteComponent', () => {
  let component: SidebarRecetteComponent;
  let fixture: ComponentFixture<SidebarRecetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRecetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
