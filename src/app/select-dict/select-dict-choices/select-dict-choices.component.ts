import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-select-dict-choices',
  templateUrl: './select-dict-choices.component.html',
  styleUrls: ['./select-dict-choices.component.css']
})
export class SelectDictChoicesComponent implements OnInit, OnChanges {
  @Input() template: TemplateRef<any>;
  @Input() choices: any[];
  @Input() active: any;
  @Input() activeIndex: number;
  @Output() onSelect = new EventEmitter();

  constructor(private ref: ElementRef) {
  }

  ngOnInit() {
  }

  selectItem($event, item) {
    this.onSelect.emit({$event, item});
  }
  // TODO move it to choice directive
  _ensureHighlightVisible() {
    const container = this.ref.nativeElement.querySelector('.dropdown-menu');
    const highlightedChoice = container.querySelector('.highlighted');

    const posY = highlightedChoice.offsetTop + highlightedChoice.clientHeight - container.scrollTop;
    const height = container.offsetHeight;

    if (posY > height) {
      container.scrollTop += posY - height;
    } else if (posY < highlightedChoice.clientHeight) {
      if (this.activeIndex === 0) {
        container.scrollTop = 0; //To make group header visible when going all the way up
      } else {
        container.scrollTop -= highlightedChoice.clientHeight - posY;
      }
    }
  }

  ngOnChanges(changesObj) {
    if (changesObj.activeIndex) {
      if (this.activeIndex !== -1) setTimeout(() => this._ensureHighlightVisible());
    }
  }
}
