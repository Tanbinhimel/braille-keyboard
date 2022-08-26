import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  @Output() outputResultChangeEvent = new EventEmitter<any>();
  @Output() outputTouchEndEvent = new EventEmitter<any>();
  @Output() outputSentenceChangeEvent = new EventEmitter<any>();
  touches: any;
  swipeTouches: any;

  constructor() {
    this.touches = [];
    this.swipeTouches = [];
  }

  ngOnInit(): void {
  }

  onTouchStart($event: TouchEvent) {
    $event.preventDefault();
    this.touches = $event.touches;
  }

  onSwipe($event: TouchEvent) {
    $event.preventDefault();
    const {touches, timeStamp} = $event;
    const value = {x: touches[0].clientX, y: touches[0].clientY};
    this.swipeTouches.push({value, timeStamp});
  }

  onTouchEnd() {
    this.outputTouchEndEvent.emit({touches: this.touches, swipeTouches: this.swipeTouches});
    this.unsetTouches();
  }

  unsetTouches() {
    this.touches = [];
    this.swipeTouches = [];
  }
}
