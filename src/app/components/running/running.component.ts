import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RunningService } from 'src/app/services/running.service';

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.css']
})
export class RunningComponent implements OnInit, OnDestroy {

  isNewRunningMode = false;
  runningSubscription: Subscription;

  constructor(private runningService: RunningService) {

  }

  ngOnInit() {
    this.runningSubscription = this.runningService.runningChange.subscribe(runningVal => {
      this.isNewRunningMode = runningVal ? true : false;
    });
  }

  ngOnDestroy() {
    this.runningSubscription.unsubscribe();
  }

}
