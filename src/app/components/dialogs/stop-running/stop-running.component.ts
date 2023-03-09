import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-running',
  templateUrl: './stop-running.component.html',
  styleUrls: ['./stop-running.component.css']
})
export class StopRunningComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passedDataToDialog: any) {}

}
