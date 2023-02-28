import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRunningComponent } from './history-running.component';

describe('HistoryRunningComponent', () => {
  let component: HistoryRunningComponent;
  let fixture: ComponentFixture<HistoryRunningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryRunningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
