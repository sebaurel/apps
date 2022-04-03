import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarArticleMobileComponent } from './sidebar-article-mobile.component';

describe('SidebarArticleMobileComponent', () => {
  let component: SidebarArticleMobileComponent;
  let fixture: ComponentFixture<SidebarArticleMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarArticleMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarArticleMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
