import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(minutes: number): string {
    const mins = Math.floor(Math.abs(minutes));
    const secs = Math.floor((Math.abs(minutes) - mins) * 60);
    const secondsString = secs < 10 ? `0${secs}` : `${secs}`;
    return `${mins}:${secondsString}`;
  }

}
