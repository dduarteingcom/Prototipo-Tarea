import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlatosComponent } from './admin-platos.component';

describe('AdminPlatosComponent', () => {
  let component: AdminPlatosComponent;
  let fixture: ComponentFixture<AdminPlatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
