import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarArticleDesktopComponent } from './sidebar-article-desktop.component';

describe('SidebarArticleDesktopComponent', () => {
  let component: SidebarArticleDesktopComponent;
  let fixture: ComponentFixture<SidebarArticleDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarArticleDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarArticleDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
