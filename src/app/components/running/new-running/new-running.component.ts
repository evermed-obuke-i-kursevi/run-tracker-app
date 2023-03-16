import { NgForm } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';
import { Run } from 'src/app/models/running';
import { RunningService } from 'src/app/services/running.service';

@Component({
  selector: 'app-new-running',
  templateUrl: './new-running.component.html',
  styleUrls: ['./new-running.component.css']
})
export class NewRunningComponent {

  // @Output() newRunStarted = new EventEmitter();
  availableRunnings: Run[];

  constructor(private runningService: RunningService) {

  }

  /**
   * @description handler for running session start
   * @param {NgForm} form - form
   */
  startRunning(form: NgForm) {
    console.log(form);
    const runModeId = form.value.runMode;
    this.runningService.startRun(runModeId);
    // this.newRunStarted.emit();
  }

  ngOnInit() {
    this.availableRunnings = this.runningService.getAvailableRunnings();
  }

}
