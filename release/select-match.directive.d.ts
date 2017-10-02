import { AfterViewInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export declare class SelectMatchDirective implements AfterViewInit {
    private el;
    focus: Subject<any>;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
}
