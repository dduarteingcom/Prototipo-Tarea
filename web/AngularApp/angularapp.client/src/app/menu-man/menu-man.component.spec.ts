import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManComponent } from './menu-man.component';

describe('MenuManComponent', () => {
  let component: MenuManComponent;
  let fixture: ComponentFixture<MenuManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuManComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
