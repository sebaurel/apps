import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRecetteMobileComponent } from './sidebar-recette-mobile.component';

describe('SidebarRecetteMobileComponent', () => {
  let component: SidebarRecetteMobileComponent;
  let fixture: ComponentFixture<SidebarRecetteMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRecetteMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRecetteMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
