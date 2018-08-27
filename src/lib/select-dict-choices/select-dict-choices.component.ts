import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'app-select-dict-choices',
  templateUrl: './select-dict-choices.component.html',
  styleUrls: ['./select-dict-choices.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectDictChoicesComponent implements OnChanges, OnInit {
  @Input() template: TemplateRef<any>;
  @Input() choices: any[];
  @Input() active: any;
  @Input() activeIndex;
  @Input() showNextPageButton: boolean;
  @Input() showPreviousPageButton: boolean;
  @Input() search;
  @Input() indexBy;
  @Input() dropdownPosition: string;


  @Output() onSelect = new EventEmitter();
  @Output() nextPage = new EventEmitter();
  @Output() prevPage = new EventEmitter();

  dropDownMenuElem;

  constructor(private ref: ElementRef) {

  }

  ngOnInit() {
    this.dropDownMenuElem = this.ref.nativeElement.querySelector('.dropdown-menu');
  }

  selectItem($event, item) {
    this.onSelect.emit({$event, item});
  }

  _ensureHighlightVisible() {
    const choices = this.dropDownMenuElem.querySelectorAll('.choice');
    if (!choices.length) return;
    let highlightedChoice;
    if (this.activeIndex === 'prevPage') {
      highlightedChoice = this.dropDownMenuElem.querySelector('.previous-page');
    }
    else if (this.activeIndex === 'nextPage') {
      highlightedChoice = this.dropDownMenuElem.querySelector('.next-page');
    }
    else if (this.activeIndex !== -1) {
      highlightedChoice = choices[this.activeIndex];
    }
    else {
      this.scrollToTop();
      return;
    }

    const posY = highlightedChoice.offsetTop + highlightedChoice.clientHeight - this.dropDownMenuElem.scrollTop;
    const height = this.dropDownMenuElem.offsetHeight;

    if (posY > height) {
      this.dropDownMenuElem.scrollTop += posY - height;
    } else if (posY < highlightedChoice.clientHeight) {
      if (this.activeIndex === 0) {
        this.dropDownMenuElem.scrollTop = 0; //To make group header visible when going all the way up
      } else {
        this.dropDownMenuElem.scrollTop -= highlightedChoice.clientHeight - posY;
      }
    }
  }

  scrollToTop() {
    this.dropDownMenuElem.scrollTop = 0;
  }

  trackByDictionary(index, item) {
    return item ? item[this.indexBy] : null;
  }

  getNextPage() {
    this.nextPage.emit();
  }

  getPrevPage() {
    this.prevPage.emit();
  }

  ngOnChanges(changesObj) {
    if (changesObj.activeIndex && changesObj.choices) {
      setTimeout(() => this._ensureHighlightVisible());
    }
    else if (changesObj.activeIndex && !changesObj.choices) {
      this._ensureHighlightVisible();
    }
  }
}
