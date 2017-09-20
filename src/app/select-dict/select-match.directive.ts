import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Directive({
  selector: '[appSelectMatch]'
})
export class SelectMatchDirective implements AfterViewInit {
  @Input() focus: Subject<any>;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.focus.subscribe(() => {
      setTimeout(() => this.el.nativeElement.focus());
    });
  }
}
