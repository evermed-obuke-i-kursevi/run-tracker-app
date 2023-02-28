import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRunningComponent } from './current-running.component';

describe('CurrentRunningComponent', () => {
  let component: CurrentRunningComponent;
  let fixture: ComponentFixture<CurrentRunningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentRunningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
