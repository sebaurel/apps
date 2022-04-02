import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRecetteDesktopComponent } from './sidebar-recette-desktop.component';

describe('SidebarDesktSidebarRecetteDesktopComponentopComponent', () => {
  let component: SidebarRecetteDesktopComponent;
  let fixture: ComponentFixture<SidebarRecetteDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRecetteDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRecetteDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
