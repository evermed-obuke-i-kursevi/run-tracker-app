import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopRunningComponent } from '../../dialogs/stop-running/stop-running.component';

@Component({
  selector: 'app-current-running',
  templateUrl: './current-running.component.html',
  styleUrls: ['./current-running.component.css']
})
export class CurrentRunningComponent implements OnInit {

  @Output() runStopped = new EventEmitter();
  progress = 0;
  timer: any;
  message = `Don't give up, you can do it!`;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 50 && this.progress < 100) {
        this.message = 'Just a bit more, keep going!'
      }
      if (this.progress >= 100) {
        this.message = 'You did it! Great job!';
        clearInterval(this.timer);
      }
    }, 1000);
  }

  openCancelDialog() {
    const dialogRef = this.dialog.open(StopRunningComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.runStopped.emit();
        } else {
          this.startOrResumeTimer();
        }
      })

  }

}
