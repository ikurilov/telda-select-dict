import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appSelectSearch]'
})
export class SelectSearchDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.focusElement()
  }

  focusElement() {
    this.el.nativeElement.focus();
  }
}
