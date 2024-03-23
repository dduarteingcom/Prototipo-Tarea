import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishOptComponent } from './dish-opt.component';

describe('DishOptComponent', () => {
  let component: DishOptComponent;
  let fixture: ComponentFixture<DishOptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DishOptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DishOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
