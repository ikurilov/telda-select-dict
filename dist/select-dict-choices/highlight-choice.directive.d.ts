import { AfterViewInit, ElementRef, OnChanges, Renderer2 } from '@angular/core';
export declare class HighlightChoiceDirective implements AfterViewInit, OnChanges {
    private el;
    private renderer;
    appHighlightChoice: any;
    constructor(el: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnChanges(changes: any): void;
}
