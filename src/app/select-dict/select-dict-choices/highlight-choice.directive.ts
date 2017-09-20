import {AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlightChoice]'
})
export class HighlightChoiceDirective implements AfterViewInit, OnChanges{
  @Input() appHighlightChoice;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {

  }

  ngOnChanges(changes) {
    if (changes.appHighlightChoice && changes.appHighlightChoice.currentValue) {
      this.renderer.addClass(this.el.nativeElement, 'highlighted')
    }
    else {
      this.renderer.removeClass(this.el.nativeElement, 'highlighted')
    }
  }
}
