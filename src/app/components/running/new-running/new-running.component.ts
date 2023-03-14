import { Component, Output, EventEmitter } from '@angular/core';
import { Run } from 'src/app/models/running';
import { RunningService } from 'src/app/services/running.service';

@Component({
  selector: 'app-new-running',
  templateUrl: './new-running.component.html',
  styleUrls: ['./new-running.component.css']
})
export class NewRunningComponent {

  @Output() newRunStarted = new EventEmitter();
  availableRunnings: Run[];

  constructor(private runningService: RunningService) {

  }

  startRunning() {
    this.newRunStarted.emit();
  }

  ngOnInit() {
    this.availableRunnings = this.runningService.getAvailableRunnings();
  }

}
