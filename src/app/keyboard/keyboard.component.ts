import { Component, OnInit } from '@angular/core';
import {KeyMapService} from "../services/data/key-map.service";

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  touches: any;
  swipeTouches: any;

  constructor(private keyMapService: KeyMapService) {
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
    const {touches, timeStamp} = $event;
    const value = {
      x: touches[0].clientX,
      y: touches[0].clientY
    };
    this.swipeTouches.push({value, timeStamp});
  }

  onTouchEnd() {
    // const letter = getCharacter(this.touches);
    //
    // if (letter) {
    //   this.result.push({touches: getFormattedTouches(this.touches), value: 'ADD ' + letter, touchType: 'static'});
    //   this.sentence += letter;
    //   this.touches = [];
    //   this.swipeTouches = [];
    //   console.log('result:', this.result);
    // }
    //
    // const isSwipedDown = swipeDown(this.swipeTouches);
    // if (isSwipedDown) {
    //   this.sentence += ' ';
    //   this.result.push({touches: getFormattedSwipedTouches(this.swipeTouches), value: 'ADD ' + 'SPACE', touchType: 'swipe'});
    //   console.log('result:', this.result);
    //   this.touches = [];
    //   this.swipeTouches = [];
    // }
    //
    // const isSwipedUp = swipeUp(this.swipeTouches);
    // if (isSwipedUp) {
    //   const deleteChar = this.sentence[this.sentence.length - 1];
    //   this.sentence = this.sentence.slice(0, -1);
    //   this.result.push({touches: getFormattedSwipedTouches(this.swipeTouches), value: 'DELETE ' + deleteChar, touchType: 'swipe'});
    //   console.log('result:', this.result);
    //   this.touches = [];
    //   this.swipeTouches = [];
    // }
  }
}
