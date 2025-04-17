import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAnimationComponent } from './car-animation.component';

describe('CarAnimationComponent', () => {
  let component: CarAnimationComponent;
  let fixture: ComponentFixture<CarAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarAnimationComponent]
    });
    fixture = TestBed.createComponent(CarAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
