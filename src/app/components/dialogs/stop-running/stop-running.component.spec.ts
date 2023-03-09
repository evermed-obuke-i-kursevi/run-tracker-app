import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopRunningComponent } from './stop-running.component';

describe('StopRunningComponent', () => {
  let component: StopRunningComponent;
  let fixture: ComponentFixture<StopRunningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopRunningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
