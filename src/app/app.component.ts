import {Component} from '@angular/core';
import {FetchResultService} from "./services/data/fetch-result.service";
import {SwipeDetectorService} from "./services/touch-event/swipe-detector.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sentence: string;
  result: any;
  response: any;

  constructor(private fetchResultService: FetchResultService, private swipeDetectorService: SwipeDetectorService) {
    this.sentence = '';
    this.result = [];
    this.response = '';
  }

  setOutputResponseEvent($event: any) {
    this.response = $event;
    if (this.response === 'success') {
      this.sentence = '';
      this.result = [];
    }
    setTimeout(() => {
      this.response = '';
    }, 3000)
  }


  setOutputTouchEndEvent($event: any) {
    const {touches, swipeTouches} = $event;
    const letter = this.fetchResultService.detectLetter(touches);

    if (letter) {
      this.addLetter(letter, touches);
    }

    const isSwipedDown = this.swipeDetectorService.detectSwipeDown(swipeTouches);
    if (isSwipedDown) {
      this.addSpace(swipeTouches);
    }

    const isSwipedUp = this.swipeDetectorService.detectSwipeUp(swipeTouches);
    if (isSwipedUp) {
      this.removeLetter(swipeTouches);
    }
  }

  private addLetter(letter: string, touches: any[]) {
    const touchCoordinates = this.fetchResultService.fetchTouchCoordinates(touches);
    const value = 'ADD ' + letter;
    this.setResult(touchCoordinates, value, 'static');

    this.sentence += letter;
  }

  private addSpace(swipeTouches: any[]) {
    const swipeTouchCoordinates = this.fetchResultService.fetchSwipeTouchCoordinates(swipeTouches);
    const value = 'ADD SPACE';
    this.setResult(swipeTouchCoordinates, value, 'touch-event');

    this.sentence += ' ';
  }

  private removeLetter(swipeTouches: any[]) {
    const removedLetter = this.sentence[this.sentence.length - 1];
    const swipeTouchCoordinates = this.fetchResultService.fetchSwipeTouchCoordinates(swipeTouches);
    const value = 'DELETE ' + removedLetter;
    this.setResult(swipeTouchCoordinates, value, 'touch-event');

    this.sentence = this.sentence.slice(0, -1);
  }

  private setResult(touches: any, value: any, touchType: any) {
    this.result.push({touches, value, touchType});
  }

}
