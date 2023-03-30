import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RunningService } from 'src/app/services/running.service';
import { StopRunningComponent } from '../../dialogs/stop-running/stop-running.component';

@Component({
  selector: 'app-current-running',
  templateUrl: './current-running.component.html',
  styleUrls: ['./current-running.component.css']
})
export class CurrentRunningComponent implements OnInit {

  progress = 0;
  timer: any;
  message = `Don't give up, you can do it!`;
  runningModeStarted: any;

  constructor(public dialog: MatDialog,
              private runningService: RunningService) {}

  ngOnInit() {
    this.runningModeStarted = this.runningService.getRunningStarted();
    this.startOrResumeTimer();
  }

  /**
   * @description Method for starting or resuming run session
   */
  startOrResumeTimer() {
    const runningTimeInSeconds = this.runningModeStarted.duration * 60;
    const intervalTimeInMS = (runningTimeInSeconds / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 50 && this.progress < 100) {
        this.message = 'Just a bit more, keep going!'
      }
      if (this.progress >= 100) {
        this.message = 'You did it! Great job!';
        this.runningService.completeRun();
        clearInterval(this.timer);
      }
    }, intervalTimeInMS);
  }

  /**
   * @description Method for opening and passing data to cancel dialog
   */
  openCancelDialog() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopRunningComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.runningService.stopRun(this.progress);
        } else {
          this.startOrResumeTimer();
        }
    });
  }

}
