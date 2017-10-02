import { AfterViewInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export declare class SelectSearchDirective implements AfterViewInit {
    private el;
    focus: Subject<any>;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    focusElement(): void;
}
