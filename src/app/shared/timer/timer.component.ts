import { Component, OnInit } from '@angular/core';
import * as countdown from 'countdown'

interface Time {
  hours: number,
  minutes: number,
  seconds: number
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {
  time: Time = null;
  timerId: number = null;
  timestamp: string = '00:00:00'

  constructor() { }

  ngOnInit() {
    let date = new Date();
    date.setHours(date.getHours() + 4);
    this.timerId = countdown(date, (ts) => {
      this.time = ts;

      let hours = this.time.hours.toString().padStart(2, "0");
      let minutes = this.time.minutes.toString().padStart(2, "0");
      let seconds = this.time.seconds.toString().padStart(2, "0");

      this.timestamp = `${hours}:${minutes}:${seconds}`;
    }, countdown.HOURS | countdown.MINUTES | countdown.SECONDS)
  }

  ngOnDestroy(): void {
    if(this.timerId) {
      clearInterval(this.timerId);
    }   
  }

}
