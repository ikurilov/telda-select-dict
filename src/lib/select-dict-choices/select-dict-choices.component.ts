import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {VirtualScrollComponent} from 'angular2-virtual-scroll';

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
  @Input() loading: boolean;

  scrollItems;

  @Output() onSelect = new EventEmitter();
  @Output() nextChunk = new EventEmitter();

  highlighted = null;

  dropDownMenuElem;

  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;

  constructor(private ref: ElementRef) {

  }

  ngOnInit() {
    this.dropDownMenuElem = this.ref.nativeElement.querySelector('.dropdown-menu');
  }

  selectItem($event, item) {
    this.onSelect.emit({$event, item});
  }

  trackByDictionary(index, item) {
    return item ? item[this.indexBy] : null;
  }

  getNextChunk() {
    this.nextChunk.emit();
  }

  onUpdate(data) {
    this.scrollItems = data;
  }

  onChange(event) {
    if (event.end !== this.choices.length - 1 || this.loading) return;
    this.getNextChunk();
  }

  scrollToIndex(idx) {
    const highlighted = this.choices[idx];
    this.virtualScroll.scrollToIndex(idx, undefined, undefined, 0);
    this.highlighted = highlighted;
  }

  ngOnChanges(changes) {
    if (changes.choices
      && changes.choices.previousValue
      && !changes.choices.previousValue.length
      && this.active) {
      const activeIdx = this.choices.findIndex(item => item.id === this.active.id);
      this.scrollToIndex(activeIdx)
    }
    /*    if (changesObj.activeIndex && changesObj.choices) {
          setTimeout(() => this._ensureHighlightVisible());
        }
        else if (changesObj.activeIndex && !changesObj.choices) {
          this._ensureHighlightVisible();
        }*/
  }
}
