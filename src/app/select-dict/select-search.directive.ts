import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Directive({
  selector: '[appSelectSearch]'
})
export class SelectSearchDirective implements AfterViewInit {
  @Input() focus: Subject<any>;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    if (!this.focus) return;
    this.focusElement();
    this.focus.subscribe(() => this.focusElement());
  }

  focusElement() {
    setTimeout(() => this.el.nativeElement.focus())
  }
}
