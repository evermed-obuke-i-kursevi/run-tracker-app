import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Run } from 'src/app/models/running';
import { RunningService } from 'src/app/services/running.service';

@Component({
  selector: 'app-new-running',
  templateUrl: './new-running.component.html',
  styleUrls: ['./new-running.component.css']
})
export class NewRunningComponent implements OnInit, OnDestroy {

  availableRunnings: Run[];
  availableRunningsSubscription: Subscription;

  constructor(private runningService: RunningService) {

  }

  /**
   * @description handler for running session start
   * @param {NgForm} form - form
   */
  startRunning(form: NgForm) {
    const runModeId = form.value.runMode;
    this.runningService.startRun(runModeId);
  }

  ngOnInit() {
    this.availableRunningsSubscription = this.runningService.availableRunningsChanged
      .subscribe(data => {
        this.availableRunnings = data;
      });
    this.runningService.fetchAvailableRunnings();
  }

  ngOnDestroy() {
    this.availableRunningsSubscription.unsubscribe();
  }

}
