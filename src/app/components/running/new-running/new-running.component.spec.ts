import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRunningComponent } from './new-running.component';

describe('NewRunningComponent', () => {
  let component: NewRunningComponent;
  let fixture: ComponentFixture<NewRunningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRunningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
