import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevComponent } from './prev.component';

describe('PrevComponent', () => {
  let component: PrevComponent;
  let fixture: ComponentFixture<PrevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrevComponent]
    });
    fixture = TestBed.createComponent(PrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
