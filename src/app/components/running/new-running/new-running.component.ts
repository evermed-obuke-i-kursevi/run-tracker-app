import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-running',
  templateUrl: './new-running.component.html',
  styleUrls: ['./new-running.component.css']
})
export class NewRunningComponent {

  @Output() newRunStarted = new EventEmitter();

  startRunning() {
    this.newRunStarted.emit();
  }

}
