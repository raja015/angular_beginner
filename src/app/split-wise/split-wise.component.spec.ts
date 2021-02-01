import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitWiseComponent } from './split-wise.component';

describe('SplitWiseComponent', () => {
  let component: SplitWiseComponent;
  let fixture: ComponentFixture<SplitWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
